var express = require('express');
var path = require('path');

let router = express.Router();
let app = express();

app.set('port', process.env.PORT || 3000);

//app.use('/static', express.static(__dirname + '/dist'));
//app.use(express.static(__dirname + '/dist'));

let options = {
	dotfiles: 'deny', //allow, ignore
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
		console.log('STATIC:', path);
		console.log('stat:', stat);
		res.set('x-timestamp', Date.now());
	}
}
app.use('/', express.static(__dirname + '/../dist', options));


app.use(function (req, res, next) {
	req.time = Date.now();
	console.log('----');
	console.log('Time:', Date.now());
	console.log('Request Type:', req.method);
	console.log('URL: ' + req.url);
	console.log('params:', req.params);
	console.log('query:', req.query);
	console.log('----');
	next();
});

app.get('/', (req, res)=> {
	res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.post('/', (req, res)=>{
	res.send('POST request..');
});

app.get('/time', (req, res)=> {
	let timespan = Date.now() - req.time;
	res.send('Time elapsed (ms): '+timespan);
});

/* /api ROUTER */
router.use(function (req, res, next) {
	console.log('****');
	console.log('API Route - Time:', new Date());
	console.log('API URL: ' + req.url);
	console.log('****');
	next();
});
router.all('/', (req, res) => res.send('<h4>hello from /api</h4>'));

router.get('/user/:id', (req, res) => {
	console.log('/user/:id: ', req.params.id);
	res.send('user_' + req.params.id);
});

app.use('/api', router);
/* ****  */

app.get('/junk', function (req, res) {
	throw new Error("/junk doesn't exist");
});

/*app.use(function (err, req, res, next) {
	console.log('Error: ' + err.message);
	console.log(err.stack);
	res.status(500).send('Something broke!');
	next(err);
});*/

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


app.listen(app.get('port'), function () {
	console.log('app listening on port 3000. press Ctrl-C to terminate');
});

/* ******************************************************************* */

function logErrors(err, req, res, next) {
	console.log('---- error ----');
	console.log('Error message:', err.message);
	console.error('Error stack:', err.stack);
	console.log('---- error ----');
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		console.log('---- clientErrorHandler ----');
		console.log(req.xhr);
		res.status(500).send({ error: 'Something failed!', err: err });
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500).send(`<h2>Something broke!</h2> <p>error: ${err}</p>`);
}
