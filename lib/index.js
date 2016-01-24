var Container = require('./container');


exports = module.exports = new Container();

exports.Container = Container;

exports.fs =
exports.node = require('./loaders/node');
exports.shelfi = require('./loaders/shelfi');
exports.node_modules = require('./loaders/node_modules');
