const express = require('express');
let db = require('../db');

let router = express.Router();

router.use(function (req, res, next) {
	console.log('---- API Route ----');
	console.log('Time:', new Date());
	console.log('URL: ', req.url);
	console.log('----');
	next();
});

router.all('/', (req, res) => res.send('<h4>hello from /api</h4>'));

router.get('/users', (req, res) => {
	db.from('users').select('*').then(function(rows){
		console.log('from.select', rows);
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

router.use(function errorHandler(err, req, res, next) {
	res.status(500).send(`<h2>API broke! :(</h2> <p>error: ${err}</p>`);
});

module.exports = router;
