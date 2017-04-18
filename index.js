var app = require("express")();

add.get("/:site", function(req, res) {
    var site = req.params.site;
    res.end(site);


})
app.listen(process.env.PORT || 5000);