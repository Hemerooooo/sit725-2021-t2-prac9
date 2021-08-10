let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { Collection } = require("mongodb");
let codeCollection;

const uri = "mongodb+srv://SIT725:hmxbzfq520@sit-725-2021-week4.t0y7c.mongodb.net/SIT725-t2-week4?retryWrites=true&w=majority";
const client = new MongoClient(uri,{ useNewUrlParser: true});

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());

//This function is used to open the connection
const creatCollections = (collectionName) =>{
  client.connect((err,db) =>{
    codeCollection = client.db().collection(collectionName);
    if(!err){
      console.log('MongoDB Connected')
    }
    else {
      console.log("DB Error: ", err);
      process.exit(1);
    }
  })
}

// const savedData = {
//   title:'abc',
//   author: 'James',
//   language: 'Java, HTML',
//   url: '1234'
// }


const insertCodes = (upload, callback) =>{
  codeCollection.insertOne(upload, callback);
}

const getCodes = (callback) =>{
  codeCollection.find({}).toArray(callback);
}

app.get('/api/uploadings',(req,res)=>{
  getCodes((err,result) =>{
    if(err) {
      res.json({statusCode: 400, message: err})
    }
    else {
      res.json({statusCode: 200, message:"Success", data: result})
    }
  })
  // console.log('uploadings requestd');
  // res.send(submissions);
})

app.post('/api/uploadings',(req,res)=>{
  console.log('New code uploaded');
  console.log('body',req.body);
  let savedData = req.body;
  insertCodes(savedData, (err,result)=>{
    if(err) {
      res.json({statusCode: 400, message: err})
    }
    else {
      res.json({statusCode: 200, message: "Codes Successfully upladed", data: result})
    }
  })
  // submissions.push(savedData);
  // res.send({result:200})
})

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});


//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


http.listen(port,()=>{
  console.log("Listening on port ", port);
  creatCollections("Codes");
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
