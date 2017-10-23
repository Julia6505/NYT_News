
//come back to this to revise. Not sure about the appends here. This code will allow the scraped articles to the print on the html page (in cards).

// function displayScrapes(articles) {
//     $("section").empty();
//     articles.forEach(function(article) {
//         $("card-header").append(article.link);
//         $("card-text").append(article.text);
//     });
// }

//get scrapes from backend
// $.getJSON("/scrape", function(data) {
//     displayScrapes(data);
// });

// $.getJSON("/articles", function(data) {
    // For each one
    // for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
//   });
  
//come back to this for buttons 
// $("#submit-scrape").on("click", function(event) {
//     event.preventDefault();

// $.getJSON("/scrape", function(data) {

//   console.log("not sure what to put here now")
//    });
// });



// $('#show-articles').on("click", function (event) {
//     event.preventDefault();
//     $.getJSON("/articles", function(data) {
    //   for (var i = 0; i < data.length; i++) {
    //   $(".card-header").append(data[i].headline); 
//     console.log(data, "THIS IS DATA")
//   });
// });

// $("#save-article").on("click", function(event) {
//     event.preventDefault();
// $.getJSON("/scrape", function(data) {
    // console.log("clicked PLEEEASEEE")
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $(".card-header").append(data[i].headline);
//     }
// //   });
// });