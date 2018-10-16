var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Client = require('3scale').Client;

client = new Client();

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  hello.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var world = req.query && req.query.hello ? req.query.hello : 'World';
    var user_key = req.query && req.query.user_key ? req.query.user_key : '0';

    // Authorize call with 3scale
    client.authrep_with_user_key({ service_token: "145dd8550a4bd957aee243a492faf77e5157678c3a043df784ee43acd81e0847",
                               service_id: "2555417761196",
                               user_key: user_key }, 
                               function(response){
      if(response.is_success()) {
        res.json({msg: 'Hello ' + world});
      } else {
        throw new Error("not authorized " + response.error_message);
      }
    });
    
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  hello.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var world = req.body && req.body.hello ? req.body.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
    //res.json({msg: 'Hello ' + world + ' what\'s up?'});
  });

  return hello;
}

module.exports = helloRoute;
