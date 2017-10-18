var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");

var app = express();

// var PORT = process.env.PORT || 8080;
var PORT = 3000;

app.use(express.static("public"));

//Mongo DB 
var databaseUrl = "scraping";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

// in case any errors with db
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//two lines below allow bodyParser to work
// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());

// three lines of code below allow handlebars to work
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// Routes

app.get("/", function(req, res) {
  res.render("index");
});

// 2. At the "/all" path, display every entry in the animals collection
app.get("/scrape", function(req, res) {
  //Scraping code, Cheerio
request("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page", function(error, response, html){
  var $ = cheerio.load(html);
  var results = [];
  $("a.story-link").each(function(i, element) {
    var link = $(element).attr("href");
    // console.log("This is my link " + link)
    var blurb = $(element).children().find(".summary").text();
    // console.log("This is my blurb " + blurb)
    var headline = $(element).children().find(".headline").text();
    // console.log("This is my headline " + headline)
    if (headline && link && blurb) {
      db.articles.insert({
        headline: headline,
        link: link,
        blurb: blurb
      },
    function (err, inserted) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(inserted);
      }
    });
  }
});
});
});

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
