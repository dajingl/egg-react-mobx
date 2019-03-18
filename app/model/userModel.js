'use strict';
const DateFormat = require('dateformat-util');

module.exports = app => {
	const Sequelize = app.Sequelize;

	const UserModel = app.model.define('lamer_user', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nick: {
			type: Sequelize.STRING,
		},
		mixnick: {
			type: Sequelize.STRING,
		},
		phone: {
			type: Sequelize.STRING,
		},
		birthday: {
			type: Sequelize.DATE,
		},
		code: {
			type: Sequelize.STRING,
		},
		points: {
			type: Sequelize.STRING,
		},
		goods: {
			type: Sequelize.TEXT,
		},
		ismember: {
			type: Sequelize.INTEGER,
		},
		isseniormember: {
			type: Sequelize.INTEGER,
		},
		award: {
			type: Sequelize.INTEGER,
		},
		record: {
			type: Sequelize.STRING,
		}
	}, {
		tableName: 'lamer_user',
		timestamps: true,
		underscoredAll: true
	});
	/**
	 * 查询数据
	 * @param {*} params 
	 */
	UserModel.getData = (params) => {
		return new Promise((resolve, reject) => {
			const mixnick = params.mixnick;
			let sql = `SELECT * FROM lamer_user WHERE mixnick='${mixnick}' LIMIT 1`;

			app.model.query(sql).spread((results, metadata) => {
				if (null != results && results.length > 0) {
					resolve(results[0]);
				} else {
					resolve({});
				}
			}).catch(err => {
				console.log('UserModel.getData-err======', err);
				reject(err);
			});
		});
	};
	return UserModel;
};