var animals = ["cat", "dog", "falcon", "horse", "tiger", "crow", "deer", "fox", "pegion", "duck"];

// function to switch from still to animated
function picMoving() {
    var movingURL = $(this).attr("data-picurl");
    $(this).attr("src", movingURL);
}

// function to switch from animated to still
function picStill() {
    var stillURL = $(this).attr("data-picurl");
    $(this).attr("src", stillURL);
}

// function to map out 10 outputs from JSON
function mapOutput() {
    $("#result-area").empty();
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&r=a&api_key=ClnEUFEAKEdutrNEzTgBVP4Sgh6EiezM&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (animalInfo) {
        if (parseInt(animalInfo.pagination.total_count) === 0) {
                $("#result-area").text("Invalid Entry");
        } else {            
            for(var i=0; i<10; i++){
            // Creates a div to hold the animal information
            var animalDiv = $("<div>");
            animalDiv.addClass("animal-info");
            // Retrieves the Rating Data
            var rating = animalInfo.data[i].rating;
            // Creates an element to have the rating displayed
            var ratingP = $("<div>");
            // Displays the rating
            ratingP.html("<strong>Rating:</strong>" + rating);
            animalDiv.append(ratingP);
            // Retrieves the file size
            var size = animalInfo.data[i].images.fixed_width.size;
            // Creates an element to hold the file size
            var sizeP = $("<div>");
            // Displays the file size
            sizeP.html("<strong>File Size</strong>" + size);
            animalDiv.append(sizeP);

            // Appends the still image
            var imgElement = $("<img>");
            imgElement.addClass("still-picture");
            var image = animalInfo.data[i].images.fixed_height_still.url;
            imgElement.attr("src", image);
            animalDiv.append(imgElement);
            
            // Appends the animation
            var imgElement1 = $("<img>");
            imgElement1.addClass("moving-picture");
            var image1 = animalInfo.data[i].images.fixed_width.url;
            imgElement1.attr("src", image1);
            animalDiv.append(imgElement1);

            // storing still & animated urls to each other             
            imgElement.attr("data-picurl", image1);
            imgElement1.attr("data-picurl", image);

            // append the animal slide in the display area
            $("#result-area").append(animalDiv);
            $(".moving-picture").hide();
            }
        }
    });
}

// function to create animal buttons
function createButtons() {
    $(".button-area").empty();

    for (var i = 0; i < animals.length; i++) {
        var button = $('<button>');
        button.attr("data-name", animals[i]);
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

// switching from still pictuee to animation
$(document).on("click", ".still-picture", picMoving);

// creates the default buttons in the beginning
createButtons();