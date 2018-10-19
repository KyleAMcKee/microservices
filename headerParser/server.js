
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
    //let ip = req.headers['x-forwarded-for'].split(',')[0];
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let language = req.headers['accept-language'];
  let systemInfo = req.headers['user-agent'];
  
  res.json({ip: ip, language: language, software: systemInfo});
  
});



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});