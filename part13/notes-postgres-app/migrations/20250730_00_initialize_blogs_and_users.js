const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('blogs', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			author: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			url: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			likes: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			created_at: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			updated_at: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			}
		})
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			created_at: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			updated_at: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			}
		})
		await queryInterface.addColumn('blogs', 'user_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('blogs')
		await queryInterface.dropTable('users')
	},
}