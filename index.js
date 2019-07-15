const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');

const config = require('./config/secret');

app = express();

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const mainRoute = require('./routes/main');
const apiRoute = require('./routes/apis');
app.use(mainRoute);
app.use(apiRoute);

mongoose.connect(config.Database, {useNewUrlParser: true}, (err) => {
    if(err)
        console.log(`Error with DB`);
    console.log(`Connected to Database`);
});

app.listen(config.PORT, (err) => {
    if(err)
        console.log(`Error`);
    console.log(`Running on Port ${config.PORT}`);
});