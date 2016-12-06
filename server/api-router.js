const express = require('express');
const bodyParser = require('body-parser');
let db = require('../db');

let jsonParser= bodyParser.json();
let router = express.Router();

router.use(function (req, res, next) {
	console.log('---- API Route ----');
	console.log('Time:', new Date());
	console.log(`${req.method} - URL: ${req.url}`);
	console.log('----');
	next();
});

router.all('/', (req, res) => res.send('<h4>hello from /api</h4>'));

router.get('/users', (req, res) => {
	db.from('users').select('*').then(function(rows){
		res.send(rows);
	}).catch(function (err) {
		throw err;
	}).finally(function(){
		//db.destroy();
	});
});

router.get('/users/:id', (req, res) => {
	db.from('users').where('id', req.params.id).select('*').first()
	.then(function(rows){
		res.send(rows);
	}).catch(function (err) {
		throw err;
	}).finally(function(){
		//db.destroy();
	});
});

router.post('/users', jsonParser, (req, res) => {
	console.log('req.body', req.body);
	let user = { name: req.body.name, email: req.body.email, created_at: new Date() };
	db.insert(user).into('users')
		.then(function (id) {
			console.log('last row id:', id);
			res.status(200).json({status: 'ok', submitted: user})
		}).catch(function(err) {
			throw err;
		});
});

router.use(function errorHandler(err, req, res, next) {
	res.status(500).send(`<h2>API broke! :(</h2> <p>error: ${err}</p>`);
});

module.exports = router;
