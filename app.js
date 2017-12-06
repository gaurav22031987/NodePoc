/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var DackCardProvider = require('./deckCardProvider').DeckCardProvider;
var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var dackCardProvider = new DackCardProvider();
app.get('/', function (req, res) {
    dackCardProvider.getCollection(function (data) {
        res.render('index', {
            title: 'Deck of Cards',
            DeckCardData: data
        });
    });

});

//remove card page
app.get('/removeCard/new', function (req, res) {
    res.render('remove_card', {
        title: 'Remove Card from Deck'
    });
});
//remove card from deck
app.post('/removeCard/new', function (req, res) {
    dackCardProvider.removeCard({
        suit: req.param('suite'),
        card: req.param('card')
    }, function (data) {
        res.redirect('/');
    });
});

app.listen(4000, () => {
    console.log('\nListening on port:4000');
});