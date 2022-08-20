const express = require('express');
var bodyParser = require("body-parser");
var parser = require('./parser');

// for external api calls
const fetch = require("node-fetch");

var CONTACTS_COLLECTION = "contacts";
var SCORES_COLLECTION = "scores";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

db = client.db();

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// SCORES -----

/*  "/api/scores"
 *    GET: finds all scores
 *    POST: creates a new score
 */

app.get("/api/scores", function(req, res) {
  db.collection(SCORES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get scores.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/scores", function(req, res) {
  var newScore = req.body;
  newScore.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(SCORES_COLLECTION).insertOne(newScore, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new score.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/scores/:id"
 *    GET: find score by id
 *    PUT: update score by id
 *    DELETE: deletes score by id
 */

app.get("/api/scores/:id", function(req, res) {
  db.collection(SCORES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

// date methods

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

Date.prototype.yyyymmddSlashed = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd,
          this.getFullYear()
         ].join('/');
};

var date = new Date();
var currDate = date.yyyymmdd();

// EXTERNAL API CALLS

// GETTING NHL SCORES - api call

app.get("/api/getNHLScores", function(req, res) {
    var jsonData;
    fetch('https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore')
    .then(response => response.json())
    .then(data => {
      var parsedJSON = parser.parseJSON(data, "nhl", currDate);
      res.status(200).json(parsedJSON);
    })
    .catch(error => console.error(error))
});

// NBA SCORES

app.get("/api/getNBAScores", function(req, res) {
    var jsonData;
    fetch('http://data.nba.net/prod/v2/'+ currDate +'/scoreboard.json')
    .then(response => response.json())
    .then(data => {
      var parsedJSON = parser.parseJSON(data, "nba", currDate);
      res.status(200).json(parsedJSON);
    })
    .catch(error => console.error(error))
});

// MLB SCORES

app.get("/api/getMLBScores", function(req, res) {
    var jsonData;
    fetch('http://statsapi.mlb.com/api/v1/schedule?sportId=1&date='+ date.yyyymmddSlashed())
    .then(response => response.json())
    .then(data => {
      var parsedJSON = parser.parseJSON(data, "mlb", currDate);
      res.status(200).json(parsedJSON);
    })
    .catch(error => console.error(error))
});


//  heroky routing

app.get('*', function (req, res) {
  res.sendfile('./dist/index.html'); // load our index.html file
});