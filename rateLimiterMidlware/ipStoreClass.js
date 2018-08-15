const noop = () => {};

class RedisStore {
  constructor(client, timeWindow){
    this.client = client;
    this.timeWindow = timeWindow;
    this.key = 'requestsNumberFromIp-';
  }

  incr(ip, cb) {
    const key = this.key + ip;
    const multi = this.client.multi();
    multi.incr(key);
    multi.pttl(key);
    multi.exec((err, result) => {
      try {
    
        const [ reqsNumber, expireTime] = result;

        if (err) return cb('RedisStoreClass error ' + err);

        if (expireTime == -1) this.client.pexpire(key, this.timeWindow, noop);

        if (reqsNumber) {
          return cb(null, reqsNumber);
        } else {
          cb('RedisStoreClass error');
        }
      } catch(err) {
        cb('RedisStoreClass error ' + err);
      }
    })
  }
};

module.exports = RedisStore;
