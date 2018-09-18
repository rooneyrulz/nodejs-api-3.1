const $express = require('express');
const $app = $express();

const $morgan = require('morgan');
const $body_parser = require('body-parser');

//Importing Mysql Connection
const $Connection = require('./api/config/db.inc');
$Connection.connect(err => {
    if (err) {
        console.log(`Error: ${err.message}`);
    } else {
        console.log(`success: connection successful!`);
    }
});

$app.use($morgan('dev'));

//Setting up body-parser
$app.use($body_parser.urlencoded({ extended: false }));
$app.use($body_parser.json());

//Handling CORS Errors
$app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//Handling Routes
$app.use('/user/signup', require('./api/routes/signup'));
$app.use('/user/login', require('./api/routes/login'));

$app.use('/user/department', require('./api/routes/department'));
$app.use('/user/employee', require('./api/routes/employee'));
$app.use('/user/customer', require('./api/routes/customer'));

//Handling Errors
$app.use((req, res, next) => {
    const $error = new Error(`An unhandled exception occured!`);
    $error.status = 404;
    next($error);
});

$app.use(($error, req, res, next) => {
    console.log(`Error: ${$error.message}`);
    res.status($error.status || 500).json({
        Error: {
            error: $error.message
        }
    });
});


module.exports = $app;