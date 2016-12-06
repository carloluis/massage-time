
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('users', function (table) {
			table.increments('id').primary();
			table.string('name');
			table.string('email');
			table.timestamp('created_at');
		}),

		knex.schema.createTableIfNotExists('appointments', function (table) {
			table.increments();
			table.string('name');
			table.dateTime('time');
			table.timestamp('created_at');
			table.integer('user_id').references('id').inTable('users');
		})
	]).then(function(res){
		console.log('migrations.up', res);
	}).finally(function(){
		knex.destroy();
	});
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users'),
		knex.schema.dropTable('appointments')
	]).finally(function(){
		knex.destroy();
	});
};
