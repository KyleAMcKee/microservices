var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  
  let date = req.params.date_string;
  let options = {month: 'long', day: 'numeric', year: 'numeric' };
  let unix;
  let utc;
  
  if (!date) {
    unix = Math.floor(new Date().getTime() / 1000);
    utc = new Date().toLocaleDateString("en-US", options);
  }
  else if (isNaN(date) || !date) {
      unix = Math.floor(new Date(date).getTime() / 1000);
      utc = new Date(date).toLocaleDateString("en-US", options);
  }
  else {
    unix = date;
    utc = new Date(date * 1000).toLocaleDateString("en-US", options);
  }
  res.json({unix: unix, utc: utc});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});