var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    app = express(),
    models = require('./models/index');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  models.Manager.findAll().then(function(managers) { 
    res.render('index', { managers: managers });
  });
});

app.get("/managers/:manager_id/tenants", function(req, res) {
  models.Tenant.findAll(
    { where: { manager_id: parseInt(req.params.manager_id) } }
  ).then(function(tenants) {
    res.render('tenants', { tenants: tenants });
  });
});

app.listen(3000);
