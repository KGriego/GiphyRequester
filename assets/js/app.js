var topicsArray = ["Mario", "Halo", "Call Of Duty", "Dark Souls"];
var topicsArrayLength = topicsArray.length;
var $gifsHolder = $("#gifsHolder");

$(document).ready(function() {

  for (i = 0; i < topicsArray.length; i++) {
    var $buttons = $("<button class='gifs' data-name=" + topicsArray[i] + ">" + topicsArray[i] + "</button>");
    $buttons.appendTo('#gameButtons');
  }

  $(".gifs").on("click", function() {
    

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

                var gamesDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var gamesImg = $("<img>");

                gamesImg.attr("src", results[i].images.fixed_height.url);

                p.appendTo(gamesDiv);
                gamesDiv.append(gamesImg);

                $gifsHolder.append(gamesDiv);
            };
        });
    })
});
