
'use strict'

const express = require('express');
const debug = require('debug')('nodestr:server');
const http = require('http');
const app = express();
 
app.use(express.static(__dirname));
 
//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/src', express.static(__dirname + '/public/src'));
 
var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
    console.log("Ctrl + c to stop..");
});
