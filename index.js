var app = require("express")();
var mongo = require("mongodb").MongoClient;
var db = 'mongodb://localhost:27017/shorturl';

app.get('/', function(req, res) {
    res.end("short url server,input a site url append this site url,then return a short url");
})
app.get('/:site', function(req, res) {
    var site = req.params.site;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (site.match(regex)) {
        var website = db.collection('website');



    } else {
        res.end("Not a website");
    }

    res.end(JSON.stringify(siteurl));


})
app.listen(process.env.PORT || 5000);