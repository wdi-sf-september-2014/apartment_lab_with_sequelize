var express = require('express'),
	pg = require('pg'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	app = express();

var models = require("./models/index.js");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
	models.Manager.findAll().success(function(managers) {
		res.render("index.ejs", {
			allManagers: managers
		});
	});
});

app.post("/", function(req, res) {
	console.log(req.body);
	models.Manager.create({ first_name: req.body.firstname, last_name: req.body.lastname, property: req.body.property}).success(function(data) {
		res.redirect("/");
	});
});

app.get("/tenants/:manager_id", function(req, res) {
	models.Tenant.findAll({where: {manager_id: req.params.manager_id} }).success(function(tenants) {
		models.Manager.find(req.params.manager_id).success(function(manager) {
			res.render("tenants.ejs", {
				allTenants: tenants,
				manager_id: req.params.manager_id,
				oneManager: manager
			});
		});
	});
});

app.post("/tenants/:manager_id", function(req, res) {
	models.Tenant.create({ first_name: req.body.firstname, last_name: req.body.lastname, manager_id: req.params.manager_id}).success(function(data) {
		res.redirect("/tenants/" + req.params.manager_id);
	});
});

app.put("/tenants/:manager_id/:tenant_id", function(req, res) {
	models.Tenant.find({ where: {id: req.params.tenant_id} }).success(function(tenant) {
		tenant.updateAttributes({
			first_name: req.body.firstname,
			last_name: req.body.lastname
		}).success(function() {
			res.redirect("/tenants/" + req.params.manager_id);
		});
	});
});

app.delete("/tenants/:manager_id/:tenant_id", function(req, res) {
	models.Tenant.find(req.params.tenant_id).success(function(tenant) {
		tenant.destroy().success(function() {
			res.redirect("/tenants/" + req.params.manager_id);
		});
	});
});

app.listen(3000);