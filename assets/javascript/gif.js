src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"

var animals = ["Tiger", "Monkey", "Panther", "Lion"];
var animal;

////////////// CREATES BUTTON FOR ITEMS IN ARRAY /////////////////

for (i = 0; i < animals.length; i++) {
    $("#button-area").append("<div class='col s6 m4'><a class='waves-effect waves-light btn data-animals' data='" + animals[i] + "'>" + animals[i] + "</a></div>")
}


/////////////// ON CLICK EVENTS ////////////////////////

$("#add-animal").on("click", newTopic);
$("#add-animal").on("click", clearInput);
$("#button-area").on('click', ".data-animals", newGif);
$("#gifs-appear-here").on("click", ".animated", imgSwap);
$("#gifs-appear-here").on("click", ".still", imgSwap);




////////////// CREATES BUTTON AFTER INPUT ///////////////

function newTopic() {
    animals.push($("#new-gif-input").val())

    $("#button-area").append("<div class='col s6 m4'><a class='waves-effect waves-light btn truncate data-animals' data='" + animals[animals.length - 1] + "'>" + animals[animals.length - 1] + "</a></div>")
        //console.log(newTopic)

}

////////////// CLEARS INPUT FIELD ///////////////////

function clearInput() {
    $("#new-gif-input").val("");
}


function newGif() {
    animal = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cowT5wF1taxtwE2I7j9EXmcpjyWNHpba&q=" + animal + "&limit=10&offset=0&lang=en";
    // console.log(animal)
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            // console.log(response)
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var rating = results[i].rating;
                rating = rating.toUpperCase();
                var gifDiv = $("<div class='item'>");
                var ratingP = $("<p>")
                ratingP.addClass("ratings")
                ratingP.text("Rated: " + rating)

                var animalImageStill = results[i].images.fixed_height_still.url;
                //var gifCards = $("#gifs-appear-here").append(animalImage);
                //var ratings = $("#gifs-appear-here").append("Rated: ", rating);
                var animalImage = $("<img class='animated'>");
                animalImage.attr("data", results[i].images.fixed_height.url);
                animalImage.attr("src", animalImageStill)
                    //gifDiv.prepend(animalImage);

                //$("#gifs-appear-here").prepend(gifDiv);



                ////////////////////////////////

                var div = $("<div>")
                div.addClass("item col s12 m4")
                div.append(ratingP)
                    // div.append($("<br>"))
                div.append(animalImage)
                $("#gifs-appear-here").prepend(div);


            }

        });
    imgSwap()
};


function imgSwap() {


    if ($(this).hasClass('animated')) {
        var gifUrl = $(this).attr("data")
        var oldGifUrl = $(this).attr("src")
        console.log("gifUrl" + gifUrl)
        console.log("oldGifUrl" + oldGifUrl)
        $(this).attr("src", gifUrl)
        $(this).attr("data", oldGifUrl)
        $(this).removeClass('animated')
        $(this).addClass('still')
    } else if ($(this).hasClass('still')) {
        console.log("IT WORKED")
        gifUrl = $(this).attr("data")
        var oldGifUrl = $(this).attr("src")
        $(this).attr("src", gifUrl)
        $(this).attr("data", oldGifUrl)
        $(this).removeClass('still')
        $(this).addClass('animated')
    }

}