var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

var data = [{item:"Add Milk"},{item:"Make List"},{item:"Clean Garage"},{item:"Practice Node.JS"}];

module.exports = function(app){

    app.get('/todo',function(req,res){

      res.render('todo',{todos:data});
    });

    app.post('/todo', urlEncodedParser, function(req,res){

      data.push(req.body);
      res.json(data);
    });

    app.delete('/todo/:item',function(req,res){

      //Removing Item.
      data = data.filter(function(todo){
        return todo.item.replace(/ /g, "-") !== req.params.item;
      });

      res.json(data);
    });
};
