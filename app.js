var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds023550.mlab.com:23550/db_ringapp2016_g');
var userSchema = require('./1_define_schema');

var express = require('express'),
	url = require('url'),
	app = express();

app.listen(process.env.PORT || 3000);

// connection error
mongoose.connection.once('error', function (err) {
	console.log('connectiob error' + err);
});

//connecting to DB
mongoose.connection.once('open', function () {
	console.log("Connected Successfully to DB");

	userSchema.find({}, function(err, user){
		if(err) throw err;
		//first route - call first get function from WS.
		app.get('/AllStudentsGrades' , 

			function (req, res) {
				console.log("DB: Get all Students");
				res.status(200).json(user);
		});
	})

	//second route - call second function from WS (by Id).
	app.get('/StudById/:Id', function (req, res) { 
		console.log(req.params.Id);
		userSchema.find({Id:req.params.Id}, function(err, user){
			if(err) throw err;
				console.log("DB: Get Student by ID");
				res.status(200).json(user);
			})
	})

	//thired route - call thired get from WS (by Year).
	app.get('/StudByYear/:Year', function (req, res) { 
		console.log(req.params.Year);
		userSchema.find({Year:req.params.Year}, function(err, user){
			if(err) throw err;
				console.log("DB: Get Student by Year");	
				res.status(200).json(user);
			})
	})

	
});
