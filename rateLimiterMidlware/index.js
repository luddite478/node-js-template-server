const RedisStore = require('./ipStoreClass');
const ms = require('ms');

const rateLimiterMidlware = opts => (req, res, next) => {
  const timeWindow = typeof opts.timeWindow === 'string'
    ? ms(opts.timeWindow)
    : typeof opts.timeWindow === 'number'
      ? opts.timeWindow
      : 1000 * 60

  const maxReqsPerTimeWindow =  opts.maxReqsPerTimeWindow || 1000;
  const ip = req.headers['X-Forwarded-For'] || req.connection.remoteAddress;
  const whitelist = opts.whiteList || [];

  const store = new RedisStore(opts.client, timeWindow);

  if (whitelist.includes(ip)) {
    next()
  } else {
    store.incr(ip, onIncr)
  }

  function onIncr (err, currentReqsPerTimeWindow) {
    try {
      if(err) {
        return next(err)
      }

      if (currentReqsPerTimeWindow <= maxReqsPerTimeWindow) {
        res.setHeader('X-RateLimit-Limit', maxReqsPerTimeWindow)
        res.setHeader('X-RateLimit-Remaining', maxReqsPerTimeWindow - currentReqsPerTimeWindow)
        next()
      } else {
        res.writeHead(429, {
          'X-RateLimit-Limit': maxReqsPerTimeWindow,
          'X-RateLimit-Remaining': 0,
          'Content-Type': 'application/json',
          'Retry-After': timeWindow
        })
        res.end(JSON.stringify('Too Many Requests'))
      }
    } catch(err) {
      next(err)
    }
  }
}

module.exports = rateLimiterMidlware
