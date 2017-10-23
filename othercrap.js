// app.get("/articles", function(req, res) {
//   // Grab every document in the Articles collection
//   db.Article
//     .find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

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