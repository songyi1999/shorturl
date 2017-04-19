var app = require("express")();
var pg = require("pg");

app.get('/', function(req, res) {
    res.end("short url server,input a site url append this site url,then return a short url");
})
app.get('/:site', function(req, res) {
    var site = req.params.site;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (site.match(regex)) {
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            if (err) throw err
            client.query("insert into sorturl (site) values ('" + site + "') ", function(err, result) {
                if (err) throw err;
                client.query("select max(id) from sorturl", function(err, re) {
                    if (err) throw err;
                    var id = re.rows[0].max;
                    out = {};
                    out.original_url = site;
                    out.short_url = req.protocol + '://' + req.get('host') + "/" + id;
                    res.append("Content-Type", "application/json");
                    res.send(JSON.stringify(out));
                })
            });
        });
    } else if (Number(site)) {
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            if (err) throw err
            client.query("select site from sorturl where id=" + Number(site), function(err, re) {
                if (err) throw err;
                var u = re.rows[0].site;
                console.log(u);

                res.send('<html><script>window.location="' + u + '"</script></html>');

            })
        });
    } else {
        res.end("Not a website");
    }
})
app.listen(process.env.PORT || 5000);