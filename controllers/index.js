var express = require('express'),
    router  = express.Router(),
    request = require('request');

// Handeling Main Route to Start Page
router.get('/', function(req, res) {
    res.render('index');
});

/* Route auf Wetter? */
//router.get('/wetter', function(req, res){
//	request('URL', function (error, response, body) {
//        	if (!error && response.statusCode == 200) {
//            		console.log(body);
//            		res.render('concerts', { result: body });
//        	}
//    	})
//	;
//});

module.exports = router;
