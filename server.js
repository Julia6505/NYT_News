var express = require("express");
// var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var db = require("./models");

// var PORT = process.env.PORT || 8080;
var PORT = process.env.PORT || 3000;
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
//mongodb://user:pass@host:port/db'
mongoose.Promise = Promise;
mongoose.connect("mongodb://nytscrape:scrape@ds227865.mlab.com:27865/heroku_n08zrf87", {
  useMongoClient: true
});
//render the homepage with the handlebars index
app.get("/", function(req, res) {
  // db.Article
  // .find({})
  // .then(function(dbArticle) {
  // res.render("index");
  res.render("index");
});
// });

//route to scrape data from NYT and handlebars code to present it on the page (corresponds with button in index.handlebars file)
app.get("/scrape", function(req, res) {

  request("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page", 
  function(error, response, html) {

  var $ = cheerio.load(html);
  var scrapedArticles = {};
//actual scraping method
  $("a.story-link").each(function(i, element) {
    var results = {};
    results.link = $(this).attr("href");
    // console.log("This is my link " + results.link)
    results.blurb = $(this).children().find(".summary").text();
    // console.log("This is my blurb " + results.blurb)
    results.headline = $(this).children().find(".headline").text();
    console.log("This is my headline " + results.headline)
//take all of the results in the for loop and put them into the results objects
    scrapedArticles[i] = results;
});
 //code to set variable for handlebars use on front-end
     var forHandlebars = {
         articles: scrapedArticles
     };
//send page to render with appropriate handlebars reference 
     res.render("index", forHandlebars);
    });
  });
//code to find and view saved articles in db on page
app.get("/savedarticles", function(req, res) {
  
    // Grab every doc in the Articles array
    db.Article.find({}, function(error, data) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Or send the doc to the browser as a json object
      else {
        var forHandlebars = {
          articles: data
        };
  
        res.render("index", forHandlebars);
      }
    });
  });
//save scraped articles to db 
app.post("/save", function(req, res) {
  //this references the Articles schema
    var newResults = {};
  
    newResults.link = req.body.link;
    newResults.blurb = req.body.blurb;
    newResults.headline = req.body.headline;

      db.Article
    .create(newResults)
    .then(function(dbArticle) {
      res.redirect("/scrape");

      console.log("YES", newResults);
    })
    .catch(function(err) {
    res.json(err);
  })
  })

app.listen(3000, function() {
  console.log("We are running on port 3000. Awesomeness.")
});

//for reference when I return to complete notes part of project 
    // var entry = new Article(newResults);
  
    // console.log("What is going on" + newResults.blurb);
  
    // Now, save that entry to the db
    // entry.save(function(err, doc) {
      // Log any errors
      // if (err) {
      //   console.log(err);
      // }
      // Or log the doc
      // else {
      //   console.log(doc);
      // }
    // });

  // });
  //____________

// app.get("/articles", function(req, res) {
//   db.Article
//     .find({})
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//       // console.log(dbArticle, "scraped")
//       console.log("TESTING THIS TESTING THIS")
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

  // db.Article
  //   .create(results)
  //   .then(function(dbArticle) {
  //     res.json(dbArticle);  
      // res.end();
      
      // console.log("YES", dbArticle);
//     })
//     .catch(function(err) {
//     res.json(err);
//   })
//   })
// })
// })
// })