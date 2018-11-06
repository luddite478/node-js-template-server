const express               =         require('express');
const redis                 =         require('redis');
const bodyParser            =         require('body-parser');
const cookieParser          =         require('cookie-parser');
const morgan                =         require('morgan');
const session               =         require('express-session');
const helmet                =         require('helmet');
const RedisStore            =         require('connect-redis')(session);
const pug                   =         require('pug');
const passport              =         require('passport');
                                      require('dotenv').config();

const keys                  =         require('./config/keys/');
const rateLimiterMidlware   =         require('./rateLimiterMidlware');
const router                =         require('./routes');
const passportSetup         =         require('./config/passport');


const PORT = process.env.PORT || 2000;
const app = express();

const redisClient = redis.createClient();

redisClient.on('connect', () => console.log('CONNECTED TO REDIS'));
redisClient.on('error', err => console.log('REDIS ERROR: ' + err));

app.use(helmet());

app.use(rateLimiterMidlware({
  client: redisClient,
  timeWindow: 10000,
  maxReqsPerTimeWindow: 20,
  whiteList: []
}))

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  store: new RedisStore({ redisClient }),
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log("ERROR: "+ err.toString());
  // res.status(404).send('Not found');
}

app.listen(PORT, () => console.log('Listening on port ' + PORT))

module.exports = app
