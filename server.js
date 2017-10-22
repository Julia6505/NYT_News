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

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/nytscrape", {
  useMongoClient: true
});


app.get("/scrape", function(req, res) {

  axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page")
  .then(function(response) {

  var $ = cheerio.load(response.data);

  $("a.story-link").each(function(i, element) {
    var results = {};
    results.link = $(this).attr("href");
    // console.log("This is my link " + results.link)
    results.blurb = $(this).children().find(".summary").text();
    // console.log("This is my blurb " + results.blurb)
    results.headline = $(this).children().find(".headline").text();
    // console.log("This is my headline " + results.headline)
    // var i;
    
    // console.log("%d", i++, results);
    
  db.Article
    .create(results)
    .then(function(dbArticle) {
      res.json(dbArticle);
      // res.end();
      
      // console.log("YES", dbArticle);
    })
    .catch(function(err) {
    res.json(err);
  })
})
  })
})

app.get("/", function(req, res) {
  db.Article
  .find({})
  .then(function(dbArticle) {
  // res.render("index");
  res.render("index", { articles : dbArticle });
});
});

app.get("/articles", function(req, res) {
  db.Article
    .find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
      // console.log(dbArticle, "scraped")
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.listen(3000, function() {
  console.log("We are running on port 3000. Awesomeness.")
});

