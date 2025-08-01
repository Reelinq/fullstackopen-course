const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model { }
Blog.init({
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
	year: {
		type: DataTypes.INTEGER,
		defaultValue: new Date().getFullYear(),
		validate: {
			min: 1991,
			max: new Date().getFullYear()
		}
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: 'user_id',
	}
}, {
	sequelize,
	underscored: true,
	modelName: 'blog'
})

module.exports = Blog