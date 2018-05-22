var mongo       = require('./mongo-initializer')
var MongoDB 	= require('mongodb').Db;

var solvedTasks = mongo.db().collection('solved_tasks');

exports.addNewTask = function(newTask, callback) {
    solvedTasks.insert(newTask, {safe: true}, callback);
}

exports.getAllRecords = function(callback){
	solvedTasks.find().toArray(
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
	solvedTasks.findOne({_id: id},
		function(e, res) {
		if(e) {
		     callback(e)
		}
		else {
		console.log(res)
		    callback(null, res)
		}
	});
}

exports.findByIdAndUser = function(idValue, userValue, callback) {
    solvedTasks.find({_id: idValue, user: userValue}).toArray(function(e, res) {
        	callback(res)
        })
}

exports.aggregateBySolvedTasks = function(callback) {
    solvedTasks.aggregate([{"$group": {"_id": "$user", "count": {"$sum": 1}}}]).toArray(function(e, res){
        callback(null, res)
    })
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}