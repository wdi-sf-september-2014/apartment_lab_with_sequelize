var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.render('index');
});

app.get("/managers/:manager_id/tenants", function(req, res) {
  res.render('tenants');
});

app.listen(3000);
