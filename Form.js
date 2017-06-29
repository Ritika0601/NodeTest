 http = require("http");
express = require("express");
 app = express();
 path = require('path');
bodyParser = require("body-parser");
MongoClient = require('mongodb').MongoClient;
 url = 'mongodb://localhost:27017/test';
 var list = "";
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) 
{
    res.sendFile(path.join(__dirname + '/view.html'));
    
    app.post('/AddEmployee',function(req,res)
     {
            

         MongoClient.connect(url,function(err,db)
                {
                   if(err)
                     {
            	      throw err;
                     }
                       db.collection('Employee').insert({
                                         "employeeName" :req.body.EmployeeName,
                                         "employeeAge" :req.body.Age,
                                         "employeeContactNumber":req.body.ContactNumber,
                                         "employeeEmailId":req.body.EmailId
                                    });
           db.close();
     });
    });


});

    app.get('/listEmployee', function(req, res){

 res.sendFile(path.join(__dirname + '/list.html'));
    
         MongoClient.connect(url,function(err,db)
                {
                   if(err)
                     {
            	      throw err;
                     }

    var cursor = db.collection('Employee').find({},{"employeeName":1,"_id":0});
        cursor.each(function(err,item)
        {
        	list = list + JSON.stringify(item);
             
        })

           db.close();




     });
         res.send(list);
	});

app.post('/DeleteEmployee/:name', function(req, res){

 res.sendFile(path.join(__dirname + '/list.html'));
    
         MongoClient.connect(url,function(err,db)
                {
                   if(err)
                     {
            	      throw err;
                     }

     db.collection('Employee').deleteOne({"employeeName":req.params.name});

           db.close();




     });
	});







app.listen(3000);


