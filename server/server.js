var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

var gameRouter = require('./routes/game');

dotenv.config();

const db_url = process.env.DB_URL;

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/game', gameRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.log("Error 404 "+req.params.path+" "+req.body.query+" "+req.url);
  console.dir(req.body);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});


const debug = require('debug')('server:server');
const http = require('http');

const port = process.env.BIND_PORT;
app.set('port', port);

const host = process.env.BIND_HOST;

const server = http.createServer(app);

console.log("listening to "+host+":"+port);
server.listen(port, host);
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
