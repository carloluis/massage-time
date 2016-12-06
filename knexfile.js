module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: "./data/dev.db"
		},
		useNullAsDefault: true,
		migrations:{
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds/dev'
		}
	}
};