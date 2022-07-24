// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/",function (req,res) {
  let curDate = new Date();
  curDate = curDate.toString().substring(0,3) + "," + curDate.toString().substring(7,10) + curDate.toString().substring(3,7) + curDate.toString().substring(10,28)
  curDate = curDate.substring(0,3) + "," + curDate.substring(3);
  res.json({"unix":Date.now(),"utc":curDate});
});

app.get("/api/:date",function (req,res) {
  try {
  let convDate = new Date(req.params.date);
  res.json({"unix":convDate.getTime(),"utc":convDate.toString().substring(0,3) + "," + convDate.toString().substring(7,10) + convDate.toString().substring(3,7) + convDate.toString().substring(10,28)});
  
  } catch (error) {
    res.json({"error":"Invaid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
