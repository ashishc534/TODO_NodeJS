var express = require('express');
var todoController = require('./controllers/todoController.js');

var app = express();

//Set up view engine.
app.set("view engine","ejs");

//Static files
app.use(express.static('./public'));

//Fire Up Controllers
todoController(app);

//Listen to port
app.listen(3000);
console.log("Listening to port:3000.");
