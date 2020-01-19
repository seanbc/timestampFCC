// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/timestamp", (request, response) => {
  // No date provided
  
    response.send({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    });
  
});
  
  app.get("/api/timestamp/:date_string", (request, response) => {

  const isYearMonthDay = request.params.date_string.split("-");

  if (isYearMonthDay.length === 3) {
    response.send({
      unix: new Date(request.params.date_string).getTime(),
      utc: new Date(request.params.date_string).toUTCString()
    });
  }

  const date = new Date(Number(request.params.date_string));
  const UTC = date.toUTCString();
  const UNIX = date.getTime()  

  if (UTC === "Invalid Date" || UNIX === null) {
    response.send({
      "error" : "Invalid Date"
    });
  }

  response.send({
    unix: date.getTime(),
    utc: date.toUTCString()
      });
  })


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});