var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');




//CREATE

// Render de Formulario
app.get('/user/new', function(req, res){
	res.render('new');
});

//Nuevo Usuario
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




//READ

//Lista de Usuarios
app.get('/user', function(req, res){

	db
		.User
		.find()
		.exec(function(err, users){

		if(err) return res.json(err);
		return res.render('index',{	users : users });
	});
});



// UPDATE

//Controlador para mostrar Formulario
app.get('/user/edit/:id', function(req, res){
	var userId = req.params.id;

	db
		.User
		.findById(userId, function(err, user){
			if(err) return res.json(err);
			res.render('edit', user);
		});
});

//Controlador para guardar en DB

app.put('/user/:id', function(req, res){
	var user = req.body;
		userId = req.params.id;
	// Eliminamos el id del objeto "users" que llego al controlador
	// ya que este no deberia poder ser modificado
	delete user.id;
	delete user._id;
	console.log('aqui estamos');
	db
		.User
		.findByIdAndUpdate(userId, user, function(err, users){
			if(err) return res.json(err);
			res.redirect('/user');
		});
});

// DELETE

app.get('/user/delete/:id', function(req, res){
	var userId = req.params.id;

	db
		.User
		.findByIdAndRemove(userId, function(err, users){
			if(err) return res.json(err);
			res.redirect('/user');
		});
});