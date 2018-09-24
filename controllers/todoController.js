var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

var data = [{item:"Add Milk"},{item:"Make List"},{item:"Clean Garage"},{item:"Practice Node.JS"}];

//Connect to database
mongoose.connect('mongodb://ashish:abcd1234@ds255767.mlab.com:55767/todos');

//Create schema - Like a blueprint
var todoSchema = new mongoose.Schema({
  item: String,
  completed: Boolean
});

//Create Model (Model name starts with captital letter)
var Todo = mongoose.model('Todo',todoSchema);

module.exports = function(app){

    app.get(['/todo','/'],function(req,res){

      var ongoing = [];
      var completed = [];

      Todo.find({completed:false},function(err,data){
        if(err)
        throw err;

        ongoing = data;

          Todo.find({completed:true},function(err,data){
            if(err)
            throw err;

          completed = data;

          res.render('todo',{completed:completed,ongoing:ongoing});
        });
      });
    });

    app.post('/todo', urlEncodedParser, function(req,res){

      var newTodo = Todo(req.body).save(function(err,data){
        if(err)
        throw err;

        res.json(data);
      });
    });

    app.post('/todo/complete/:item',urlEncodedParser,function(req,res){

        var completedTodo = Todo.findOneAndUpdate({item:req.params.item.replace(/\-/g," "),},{$set:{completed:true}},function(err,data){
          if(err)
          throw err;

          res.json(data);
        });
    });

    app.post('/todo/uncomplete/:item', urlEncodedParser,function(req,res){

      var unCompletedTodo = Todo.findOneAndUpdate({item:req.params.item.replace(/\-/g," "),},{$set:{completed:false}},function(err,data){

        if(err)
        throw err;

        res.json(data);
      });
    });

    app.delete('/todo/:item',function(req,res){

      //Replace "-" with " " (as original before replacing with -) and then remoeve it.
      Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err)
        throw err;

        res.json(data);
      });
    });
};
