//come back to this to revise. Not sure about the appends here. This code will allow the scraped articles to the print on the html page (in cards).

function displayScrapes(articles) {
    $("section").empty();
    articles.forEach(function(article) {
        $("card-header").append(article.link);
        $("card-text").append(article.text);
    });
}

//get scrapes from backend
// $.getJSON("/scrape", function(data) {
//     displayScrapes(data);
// });

//come back to this for buttons 
$("#submit-scrape").on("click", function(event) {
    event.preventDefault();
// $.getJSON("/scrape", function(data) {
    console.log("clicked PLEEEASEEE")
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $(".card-header").append(data[i].headline);
//     }
//   });
});

$("#save-article").on("click", function(event) {
    event.preventDefault();
// $.getJSON("/scrape", function(data) {
    console.log("clicked PLEEEASEEE")
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $(".card-header").append(data[i].headline);
//     }
//   });
});