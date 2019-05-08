var startingButtons = ["cars", "rolls eyes", "basketball", "dwight"];

function renderButtons() {
    $("#addButton").empty();
    //for loop that creates buttons
    for (i = 0; i < startingButtons.length; i++) {
        var button = $("<button>");
        button.addClass("topic");
        button.attr("data-name", startingButtons[i]);
        button.text(startingButtons[i]);
        $("#addButton").append(button);
    }
    addGif();
}

$("#addGif").on("click", function() {
    var userInput = $("#gif-input")
        .val()
        .trim();
    startingButtons.push(userInput);
    renderButtons();
    return false;

    if (userInput === " ") {
        $("#gif-input")
            .val()
            .trim();
    }
});
renderButtons();

function addGif() {
    $("button").on("click", function() {
        var p = $(this).data("name");
        var apiKey = "NLP7mpZTlcS2zzHLDkdcvIjR8kgLjBQJ";

        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${p}&api_key=NLP7mpZTlcS2zzHLDkdcvIjR8kgLjBQJ&limit=10`;

        $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
            var results = response.data;
            console.log(response);

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="item">');
                var rating = results[i].rating;
                var p = $("<p>").text(`Rating: ${rating}`);

                var giphyImg = $("<img>");
                giphyImg.attr("src", results[i].images.fixed_height_still.url);
                giphyImg.attr("data-still", results[i].images.fixed_height_still.url);
                giphyImg.attr("data-animate", results[i].images.fixed_height.url);
                giphyImg.attr("data-state", results[i].images.fixed_height_still.url);

                gifDiv.append(giphyImg);
                gifDiv.append(p);

                $("#gifsAppearHere").prepend(gifDiv);
            }

            $(".item")
                .children("img")
                .on("click", function() {
                    var state = $(this).attr("data-state");

                    if (state == "still") {
                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
        });
    });
}
