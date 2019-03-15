const express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
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

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

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

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

var date = new Date();
var currDate = date.yyyymmdd();

// EXTERNAL API CALLS

// GETTING NHL SCORES - api call

app.get("/api/getNHLScores", function(req, res) {
    var jsonData;
    fetch('https://statsapi.web.nhl.com/api/v1/schedule')
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


//  heroky routing

app.get('*', function (req, res) {
  res.sendfile('./dist/index.html'); // load our index.html file
});