var express = require('express');
var cors = require('cors');

var app = express();

// Enable CORS for all requests
app.use(cors());

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

app.use('/hello', require('./lib/hello.js')());

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080; // must be 8080 to run on OpenShift
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'; // must be 0.0.0.0 to run on OpenShift
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + "on host: " + host + " on port: " + port); 
});
