var animals = ["cat", "dog", "falcon", "horse", "tiger", "crow", "deer", "fox", "pegion", "duck"];

// function to map out 10 outputs from JSON
function mapOutput() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&r=a&api_key=ClnEUFEAKEdutrNEzTgBVP4Sgh6EiezM&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (animalInfo) {
        console.log(animalInfo);
        console.log(animalInfo.pagination);
        console.log(animalInfo.pagination.total_count);
        console.log(animalInfo.data[0].slug);
        if (parseInt(animalInfo.pagination.total_count) === 0) {
                $("#result-area").text("Invalid Entry");
        } else {            
            for(var i=0; i<10; i++){
            // Creates a div to hold the animal information
            var animalDiv = $("<div>");
            // Retrieves the Rating Data
            var rating = animalInfo.data[i].rating;
            // Creates an element to have the rating displayed
            var ratingP = $("<div>");
            // Displays the rating
            ratingP.html("<strong>Rating:</strong>" + rating);
            animalDiv.append(ratingP);
            // Retrieves the release year
            var size = animalInfo.data[i].images.fixed_width.size;
            // Creates an element to hold the release year
            var sizeP = $("<div>");
            // Displays the release year
            sizeP.html("<strong>Release Year:</strong>" + size);
            animalDiv.append(sizeP);


            // append the animal slide in the display area
            $("#result-area").append(animalDiv);
                //$("#result-area").append(" slug: " + animalInfo.data[i].slug);
            }
        }
        //for (var i=0; i<10; i++){

        //}
    });
}

// function to create animal buttons
function createButtons() {
    $(".button-area").empty();

    for (var i = 0; i < animals.length; i++) {
        var button = $('<button>');
        button.attr("data-name", animals[i]);
        button.attr("data-state", false);
        button.addClass("animal btn btn-info");
        button.text(animals[i]);
        $(".button-area").append(button);
    }
}

// adding new animal as the user submits new names
$("#add-animal").on("click", function (event) {
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    var userInput = $("#animal-input").val().trim();
    animals.push(userInput);
    $("#animal-input").val("");

    // calling the function to RE-create animal buttons
    createButtons();
});

// Adding click event listeners to all elements with a class of "result-area"
$(document).on("click", ".animal", mapOutput);

// creates the default buttons in the beginning
createButtons();