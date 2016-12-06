const ENV  = 'development';
let config = require('./knexfile.js');
let knex   = require('knex')(config[ENV]);

knex.migrate.latest(config[ENV])
	.then(function() {
		return knex.seed.run(config[ENV]);
	})
	.then(function() {
		console.info('migrations and seed finished');
	});

knex.migrate.currentVersion(config[ENV]).then((res) => console.info('migrate version', res));

module.exports = knex;