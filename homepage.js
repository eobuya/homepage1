var express = require("express");
var fortune = require("./fortune");

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set("port", process.env.PORT || 3000);

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' &&  req.query.test === '1';
  next();
});

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about', {
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/photo', function(req, res){
	res.render('photo');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

//static pages
app.use(express.static(__dirname + '/public'));

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get("port"), function(){
	console.log( "Express started on http://localhost:" +
		app.get("port") + "; press Ctrl-C to terminate." );
});
