
const http          = require( "http" );
const url           = require( "url" );
const queryString   = require( "querystring" );
const express       = require( "express" );
const port          = 8080;

const core          = require("./core.js");

var app = express();
app.use(express.static('static'))
app.get('/request', function (request, response) {
    console.log("Got request");
    var queryObj = queryString.parse(url.parse(request.url).query);
    var obj = JSON.parse( queryObj.jsonData );
    core.run(obj).then(function(data){
        console.log(data);
        response.end(data);
    });
});
app.listen(process.env.PORT || port);
