$(document).ready(function() {

	$('#content').hide()		//start out with well hidden
	$('#button').click(function (){  
		//make an ajax call to a quote api when the button is clicked
		$.ajax({
			 url: "http://api.forismatic.com/api/1.0/",
			      jsonp: "jsonp",
			      dataType: "jsonp",
			      data: {
			        method: "getQuote",
			        lang: "en",
			        format: "jsonp"
			      }
			    })
			    .done(update)
			    .fail(handleErr);
		});
});

function update(response) {
	//update the content well with quote and author
	//pre: none
	//post: quote and author are added to their respecive elements
	//and the content well is shown.
	console.log("success!")
	console.log(response.quoteText)
	var quote = response.quoteText;
	var author = response.quoteAuthor;
	$("#quote").text(quote);
	$("#author").text(author);
	$('#content').show();
	var url = prep_twitter(quote, author);
	$("#twitter-link").attr("href", url);
}

function handleErr(jqxhr, textStatus, err) {
	//error handler
  console.log("Request Failed: " + textStatus + ", " + err);
	$("#quote").text("Sorry, this page encountered an error. Please try again later.")
}

function prep_twitter(q, a) {
	//preps a link for posting to twitter
	//pre: a quote and author
	//the url to tweet this quote and author

	var tweet = q + " --" + a;

	url = "https://twitter.com/intent/tweet?text="+tweet

	return (encodeURI(url));
}
