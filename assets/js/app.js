var topicsArray = ["Mario", "Halo", "Call Of Duty", "Dark Souls", "Naruto"];
var topicsArrayLength = topicsArray.length;
var $gifsHolder = $("#gifsHolder");
var $NewGifRequest = $("#NewGifRequest");
var $gameButtons = $("#gameButtons")

$(document).ready(function() {

  for (i = 0; i < topicsArray.length; i++) {
		var $buttons = $("<button class='buttonForGifs btn btn-dark mx-1 my-1' data-name=" + topicsArray[i] + ">" + topicsArray[i] + "</button>");
    $buttons.appendTo($gameButtons);
	}

	$("#addNewGifRequest").on("click", function() {
		
		var GifRequest = $NewGifRequest.val().trim();
		topicsArray.push(GifRequest);
		console.log(topicsArray);
		
		for (i = 0; i < topicsArray.length; i++) {
				if (topicsArray[i] === GifRequest) {
					var $newButtons = $("<button class='buttonForGifs btn btn-dark my-1 mx-1' data-name=" + GifRequest + ">" + GifRequest + "</button>");
					$newButtons.appendTo($gameButtons);
			};
		};
	});

  $(".buttonForGifs").on("click", function() {
		
		var gamesName = $(this).attr("data-name");
		console.log(gamesName);
		
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gamesName + "&api_key=8C8sWefWWI547AAfsnwY9YVLftpmPZTd&limit=10";
		
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.then(function(response) {
			console.log(queryURL);
			
			console.log(response); 
			var results = response.data;
			
			for (var i = 0; i < results.length; i++) {
				
				var gamesDiv = $("<div class='gifsHolder'>");
				
				var p = $("<p>").text("Rating: " + results[i].rating);
				
				var gamesImg = $("<img>");
				
				gamesImg.attr("src", results[i].images.original_still.url).attr("data-still", results[i].images.original_still.url).attr("data-animate", results[i].images.original.url).attr("data-state", "still").attr("class", "gifs");
				
				p.appendTo(gamesDiv);
				gamesDiv.append(gamesImg);
				
				$gifsHolder.append(gamesDiv);
			};
			
			$(".gifs").on("click", function() {
				
				var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			});
		});
		$gifsHolder.empty();
	});
});
