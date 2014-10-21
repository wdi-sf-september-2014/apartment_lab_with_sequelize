var express = require ('express'),
	pg = require('pg'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');
	
var app = express();

var models = require('./models/index.js');

app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	models.manager.findAll().success(function (managers) {
		res.render('index.ejs', {
			all_managers: managers
		});
	});
});

app.post('/', function(req, res) {
	models.manager.create({
		first_name:req.body.firstname,
		last_name:req.body.lastname,
		property:req.body.property
	}).success(function() {
		res.redirect('/');
	});
});

app.get('/tenant/:id', function(req, res) {
	models.tenant.findAll({ where: { man_id: req.params.id}}).success(function (tenants) {
		models.manager.find(req.params.id).success(function (property) {
			res.render('tenants.ejs', {
				all_tenants:tenants,
				man_id:req.params.id,
				oneProperty:property
			});
		});
	});
});

app.post('/tenant/:id', function(req, res) {
	models.tenant.create({
		first_name:req.body.firstname,
		last_name:req.body.lastname,
		man_id:req.params.id
	}).success(function(data) {
		res.redirect('/tenant/' + req.params.id);
	});
});



app.listen(3000);