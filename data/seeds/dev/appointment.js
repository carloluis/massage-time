
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('appointments').del()
		.then(function () {
			return Promise.all([
				knex('appointments').insert({id: 1, name: 'initial_appointment', time: new Date(2017,0,1,10,25), created_at: Date.now(), user_id:1}),
				knex('appointments').insert({id: 2, name: 'initial_appointment', time: new Date(2017,0,1,11,00), created_at: Date.now(), user_id:2})
			]);
		});
};
