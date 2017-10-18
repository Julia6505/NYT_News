//come back to this to revise. Not sure about the appends here. This code will allow the scraped articles to the print on the html page (in cards).
function displayScrapes(articles) {
    $("section").empty();
    articles.forEach(function(article) {
        $("card-header").append(article.link);
        $("card-text").append(article.text);
    });
}

//get scrapes from backend
$.getJSON("/scrape", function(data) {
    displayScrapes(data);
});

//come back to this for buttons 