const express               =         require('express');
const redis                 =         require('redis');
const bodyParser            =         require('body-parser');
const cookieParser          =         require('cookie-parser');
const morgan                =         require('morgan');
const session               =         require('express-session');
const helmet                =         require('helmet');

const rateLimiterMidlware   =         require('./rateLimiterMidlware');
const router                =         require('./routes');

require('dotenv').config();

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));
router(app);
app.use(errorHandler);

function errorHandler(err, req, res) {
  console.log("ERROR: "+ err);
  res.status(404);
}

app.listen(PORT, () => console.log('Listening on port ' + PORT))
