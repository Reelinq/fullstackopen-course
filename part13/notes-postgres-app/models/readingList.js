const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model { }

ReadingList.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'users', key: 'id' },
	},
	blog_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'blogs', key: 'id' },
	},
	is_read: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'reading_list',
})

module.exports = ReadingList