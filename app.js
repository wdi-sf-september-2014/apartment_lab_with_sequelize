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
  res.redirect("/managers");
});

app.get("/managers", function(req, res) {
  models.Manager.findAll().then(function(managers) { 
    res.render('index', { managers: managers });
  });
});

app.get("/managers/:id/tenants", function(req, res) {
  models.Tenant.findAll(
    { where: { manager_id: parseInt(req.params.id, 10) } }
  ).then(function(tenants) {
    res.render('tenants', { tenants: tenants });
  });
});

app.put("/managers/:id", function(req, res) {
  models.Manager.find(parseInt(req.params.id, 10)).then(function(manager){
    manager.updateAttributes({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      property: req.body.property
    }).then(function(manager){ 
      res.redirect('/managers/' + manager.id);
    });
  });
});

app.post("/managers", function(req, res) {
  models.Manager.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    property: req.body.property
  }).then(function(manager) {
    res.redirect('/managers');
  });
});

app.delete("/managers/:id", function(req, res) {
  models.Manager.find(req.params.id).then(function(manager) {
    manager.destroy();
  }).then(function() {
    res.redirect('/managers');
  });
});

app.listen(3000);
