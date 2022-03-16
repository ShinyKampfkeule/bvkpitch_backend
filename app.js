var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const compression = require('compression')

const indexRouter = require('./routes/index');
const comparitiveRouter = require('./routes/comparativeOffers');
const searchRouter = require('./routes/getSearch');
const yieldsRouter = require('./routes/marketYields');
const mlpRouter = require('./routes/machineLearningPrices');
const Users = require("./postgres/User");

var app = express();

const usersArray = [
    {id: 2, name: 'Test'},
    {id: 3, name: 'Test1'},
    {id: 4, name: 'Test2'},
    {id: 5, name: 'Test3'},
    {id: 6, name: 'Test4'},
]

Users.bulkCreate( usersArray, {
    ignoreDuplicates: true
})

app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/analysis', indexRouter);
app.use('/comparativeOffers', comparitiveRouter);
app.use('/search', searchRouter)
app.use('/yields', yieldsRouter)
app.use('/mlp', mlpRouter)

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
});

module.exports = app;
