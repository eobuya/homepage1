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

//static pages
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({ extended: true }));

// routes //
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

app.get('/courses', function(req, res){
	res.render('courses',{
		courses: [
			{ name: 'Advanced Programming', credits: '3', instructor: 'Mark Voortman', description: 'The course focuses on problem solving but with a much higher difficulty level. The students will be required to write programs that involve multiple units of organization, e.g., classes. Several advanced algorithms will be discussed and should be implemented by the students. Prerequisites: CMPS 260.' },
			{ name: 'Web Application Development',credits: '3', instructor: 'Mark Voortman',  description: 'This course will provide a foundation in several facets of establishing and maintaining a website. This includes the latest advances in client side as well as server side technologies. The goal is to have students design, implement, and run advanced  web  applications.  It  will  also  cover  in  some  detail the  protocols  required  for  web  development.  Prerequisites:CMPS 261, CMPS 262.' },
			{ name: 'Accounting I  (1st Term)',credits: '3', instructor: 'Cheryl Clark',  description: 'The basic principles and procedures for gathering, recording, summarizing and interpreting accounting data.' },
			{ name: 'Accounting II (2nd Term)',credits: '3', instructor: 'Cheryl Clark',  description: 'General accounting principles, special procedures for manufacturing operations and analysis of financial and fund statements. Prerequisite: ACCT 101.' },
			{ name: 'Corporate Finance',credits: '3', instructor: 'Joseph DeFazio',  description: 'The problems associated with the effective management of capital. Includes the development of corporations, legal aspects, securities market, and financial planning and development. Prerequisites: ACCT 210, MATH 175.' },
		],
	});
});

app.get('/contact-info', function(req, res){
	res.render('contact-info', { csrf: "CSRF token goes here" });
});

app.post('/process', function(req, res){
		if(req.xhr || req.accepts('json,html')==='json'){
				// if there were an error, we would send { error: 'error description' }
				res.send({
					success: true,
			//		message: req.body.email
				});
		// console.log('Name (from querystring): ' + req.query.form);
		// console.log('CSRF token (from hidden form field): ' + req.body._csrf);
				console.log('Name    : ' + req.body.name);
				console.log('Email   : ' + req.body.email);
				console.log('Comments: ' + req.body.comments);
		} else {
				// if there were an error, we would redirect to an error page
				res.redirect(303, '/thank-you');
		}
});

app.get('/thank-you', function(req, res){
	res.render('thank-you');
});

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
