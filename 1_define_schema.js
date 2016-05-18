var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
	Name: {type:String, index:1, requirea:true, unique:true},
	Grade: Number,
	Id: {type:String, index:1, unique:true, required: true},
	Year: {type:String}

}, {collection: 'Students'});

var User = mongoose.model('User', userSchema); 

module.exports = User;
//mongoose.model('Name', schema name);