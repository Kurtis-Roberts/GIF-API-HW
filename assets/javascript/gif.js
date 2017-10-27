src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"

var animals = ["Tiger", "Monkey", "Panther", "Lion"];
var animal;



////////////// CREATES BUTTON FOR ITEMS IN ARRAY /////////////////

$(document).ready(function() {
    for (i = 0; i < animals.length; i++) {
        $("#button-area").append("<div class='col s6 m4'><a class='waves-effect waves-light btn' data='" + animals[i] + "'>" + animals[i] + "</a></div>")
    }
});


/////////////// ON CLICK EVENTS ////////////////////////

$("#add-animal").on("click", newTopic);
$("#add-animal").on("click", clearInput);
$(".data-animals").on("click", newGif);


////////////// CREATES BUTTON AFTER INPUT ///////////////

function newTopic() {
    animals.push($("#new-gif-input").val())

    $("#button-area").append("<div class='col s6 m4'><a class='waves-effect waves-light btn truncate' data='" + animals[animals.length - 1] + "'>" + animals[animals.length - 1] + "</a></div>")
    console.log(newTopic)

}

////////////// CLEARS INPUT FIELD ///////////////////

function clearInput() {
    $("#new-gif-input").val("");
}


function newGif() {
    var animals = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cowT5wF1taxtwE2I7j9EXmcpjyWNHpba&q=" + animals + "&limit=25&offset=0&lang=en";
    console.log(animals)
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response)
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animalImage = $("<img>");
                console.log(animalImage)
                animalImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
};