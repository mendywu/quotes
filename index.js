'use strict'
console.log('Loading function');

var request = require('request');

//searches quotes by topic
function searchByTopic (topic) {
  var quotesList = {"quotes" : []};
   request(`http://www.brainyquote.com/quotes/topics/topic_${topic}.html`, function (error, response, body) {
     if (!error){
        var quotesHTML = body.substring
          (body.indexOf('<div id="quotesList'), body.indexOf('<div class="bq_masonry_sidenav">'));
        var quotesSplit = quotesHTML.split('<div class="masonryitem boxy bqQt bqShare">');
        var i = 0;
        quotesSplit.forEach(function(quote){
          if (quote.substring(quote.indexOf("view quote"), quote.indexOf('</span>')) != ''){
            quotesList.quotes[i] = {"quote" : quote.substring(quote.indexOf("view quote") + 12, quote.indexOf('</span>') - 6),
                          "author" : quote.substring(quote.indexOf("view author") + 13, quote.indexOf("</div>") - 4)};
            i++;
          }
        });
        var jsontext = JSON.stringify(quotesList);
        console.log(quotesList);
        document.write(jsontext);
    } else {
      console.log('Invalid topic');
    }
  });
}

//searches quotes by tag
function searchByTag (tag){

}
//var quotes =
//searchByTopic("sadness");
//console.log(quotes);
