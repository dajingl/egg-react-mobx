exports.static = true;

exports.reactssr = {
  enable: true,
  package: 'egg-view-react-ssr'
};

exports.validate = {
	package: 'egg-validate'
};

exports.sequelize = {
	enable: true,
	package: 'egg-sequelize'
};

exports.redis = {
	enable: false,
	package: 'egg-redis'
};

exports.cors = {
	enable: true,
	package: 'egg-cors'
};