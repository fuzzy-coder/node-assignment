var express = require('express');
var logger = require('morgan');

let primeNumbersRouter = require('./routes/prime_numbers');
let usersRouter = require('./routes/users');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/prime_number', primeNumbersRouter);
app.use('/user', usersRouter);

module.exports = app;