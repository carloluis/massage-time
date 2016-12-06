
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users').del()
		.then(function () {
			return Promise.all([
				knex('users').insert({id: 1, name: 'user_1', email: 'user1@examp.le', created_at: Date.now()}),
				knex('users').insert({id: 2, name: 'user_2', email: 'user2@examp.le', created_at: Date.now()})
			]);
		});
};
