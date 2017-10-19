var express = require("express");
// var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
// var request = require("request");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var db = require("./models");

// var PORT = process.env.PORT || 8080;
var PORT = 3000;
var app = express();

//------Mongo DB before using Mongoose
// var databaseUrl = "scraping";
// var collections = ["articles"];
//-------end

//two lines below allow bodyParser to work
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//see requests in console 
app.use(logger("dev"));

app.use(express.static("public"));

// three lines of code below allow handlebars to work
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Mongo DB connection 

// in case any errors with db (Mongojs)
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Routes

app.get("/", function(req, res) {
  res.render("index");

});
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/nytscrape", {
  useMongoClient: true
});
// 2. At the "/all" path, display every entry in the animals collection
app.get("/scrape", function(req, res) {
  //Scraping code, Cheerio
  axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page").then(function(response) {

  var $ = cheerio.load(response.data);

  $("a.story-link").each(function(i, element) {
    var results = {};
    results.link = $(this).attr("href");
    // console.log("This is my link " + results.link)
    results.blurb = $(this).children().find(".summary").text();
    // console.log("This is my blurb " + results.blurb)
    results.headline = $(this).children().find(".headline").text();
    // console.log("This is my headline " + results.headline)
    db.Article
    .create(results)
    .then(function(dbArticle) {
      // res.send("Scrape Complete");
      console.log(results)
    })
    .catch(function(err) {
      res.json(err);
    })
  })
  })
})

    //--------below code was for Mongojs before Mongoose 
  //   if (headline && link && blurb) {
  //     db.articles.insert({
  //       headline: headline,
  //       link: link,
  //       blurb: blurb
  //     },
  //   function (err, inserted) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     else {
  //       console.log(inserted);
  //     }
  //   });
  // }
  //----------end of Mongojs code


//   db.articles.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(found);
//     }
//   });
// });

// 3. At the "/name" path, display every entry in the animals collection, sorted by name
// app.get("/name", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
//   db.animals.find().sort({ name: 1 }, function(error, found) {
    // // Log any errors if the server encounters one
    // if (error) {
    //   console.log(error);
    // }
    // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
//app.get("/weight", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  //db.animals.find().sort({ weight: -1 }, function(error, found) {
    // Log any errors if the server encounters one
   // if (error) {
    //  console.log(error);
   // }
    // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

app.listen(3000, function() {
  console.log("We are running on port 3000. Awesomeness.");
});
