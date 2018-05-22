var mongo       = require('./mongo-initializer')
var MongoDB 	= require('mongodb').Db;
var tasks = mongo.db().collection('tasks');

exports.addNewTask = function(newTask, callback) {
    tasks.insert(newTask, {safe: true}, callback);
}

exports.getAllRecords = function(callback){
	tasks.find().toArray(
		function(e, res) {
		if (e) {
		    callback(e)
		}
		else {
		    callback(null, res)
		}
	});
}

exports.findById = function(id, callback){
	tasks.findOne({_id: getObjectId(id)},
		function(e, res) {
		if(e) {
		     callback(e)
		}
		else {
		    callback(null, res)
		}
	});
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}