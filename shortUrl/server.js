'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Site = require('./site.model.js');
const shortid = require('shortid');
const validUrl = require('valid-url');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
app.post('/api/shorturl/new(*)', urlencodedParser, function (req, res) {
  
  if (!validUrl.isUri(req.body.url)) {
      res.send("[-] Error " + req.body.url + " is an invalid URL");
  }
  let short = shortid.generate();
  let url = req.body.url;
  
  let data = new Site ({
    originalURL: url,
    shortURL: short
  });
  
  data.save((err) => {
     if (err) {
        return res.send("error adding to db"); 
     }
    res.json(data.shortURL);
  });
});

/* Query database and foward */
app.get('/api/shorturl/new/:shorturl', (req, res) => {
    Site.findOne({'shortURL': req.params.shorturl}, (err, data) => {
      if (err) {
         return err; 
      }
      res.redirect(301, data.originalURL);
    });
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});