var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    chalk = require('chalk'),
    faye = require('faye'),
    gpio = require('rpi-gpio'),
    http = require('http');

var configDB = require('./config/database.js');

gpio.setup(7, gpio.DIR_OUT);



var app = express(),
    server = http.createServer(app),
    // Faye Configuration and attachment
    bayeux = new faye.NodeAdapter({
        mount: '/',
        timeout: 45
    });
    bayeux.attach(server);

// FINAL Route Controllers
var index = require('./controllers/index');


mongoose.createConnection(configDB.url);

/* ViewEngine Setup */
app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));

app.set('view engine', 'handlebars');

// Setting environments for the server
app.set('port', process.env.PORT || 3000);

/* Setting up the secret for our JWT
app.set('superSecret', config.secret);
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
*/app.use(express.static(path.join(__dirname, '/public')));

// Routing Middleware Configuration
app.use('/', index);


app.post('/led/on', function(req, res){
console.log("test");
	gpio.write(7, true, function(err){
		if (err) throw err;
		console.log('es geht!!!');
		console.log(path.join(__dirname, 'public'));
		return res.render('index', {status: "LED ist ON"});
	});
});

app.post('/led/off', function(req, res){
gpio.write(7, false, function(err) {
        if (err) throw err
        console.log('Written False to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "Ohh!! Led is Off"});
    });

});




server.listen(8001, function() {
   console.log("Server is up and running. ");
});

mongoose.connect(configDB.url);
console.log("Mit mongodb verbunden.");

module.exports = app;
