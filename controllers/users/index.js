var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.get('/user/new', function(req, res){
	res.render('new');
});

app.post('/user', function(req, res){
	var u = req.body;

	// podemos acceder a la DB sin hacer require porque es global

	// asignando los valores que vienen del formulario
	var newUser = new db.User({
		name: u.name,
		birthdate: u.birthdate,
		isAdmin: u.isAdmin === 'on' ? true : false
	});

	//tambien se puede hacer new db.User(u) porque los campos del formulario
	// tienen el mismo nombre de las propiedades del modelo

	newUser.save(function(err, user){
		if(err) res.json(err);
		res.redirect('/user');
	});
});