let express = require("express");
let app = express();
let dbConnect = require("./dbConnect");

//dbConnect.dbConnect()
//var app = require('express')();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
//const MongoClient = require('mongodb').MongoClient;

// routes
let codesRoute = require("./routes/codes");

var port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/api/uploadings", codesRoute);

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

//socket test
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 3000);
});

http.listen(port, () => {
  console.log("Listening on port ", port);
});
