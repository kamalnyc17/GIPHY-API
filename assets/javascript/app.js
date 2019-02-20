var animals = ["cat", "dog", "falcon", "horse", "tiger", "crow", "deer", "fox", "seal", "duck"];
var shallAppend = false;
var animal;
var animalCounter = 0; //this variable will keep track of the running data index

// adding to favorite section
function addToFavorite() {
    var animalDiv = $("<div>");
    animalDiv.addClass("animal-info");

    // Retrieves the Rating Data
    var rating = $(this).attr("rating");
    // Creates an element to have the rating displayed
    var ratingP = $("<div>");
    ratingP.addClass("label");
    // Displays the rating
    ratingP.html(rating);
    animalDiv.append(ratingP);

    // create the still image
    var imgElement = $("<img>");
    // imgElement.addClass("still-picture");
    var image = $(this).attr("still-pic");
    var image1 = $(this).attr("moving-pic");
    imgElement.attr("src", image);
    imgElement.attr("data-picurl", image1);
    imgElement.attr("data-picurl1", image);
    animalDiv.append(imgElement);

    // append the animal slide in the favorite area
    $("#favorite-area").append(animalDiv);

}

// function to switch from still to animated
function picMoving() {
    var picURL = $(this).attr("src");
    var stillURL = $(this).attr("data-picurl");
    var movingURL = $(this).attr("data-picurl1");

    if (picURL === stillURL) {
        $(this).attr("src", movingURL);
    } else {
        $(this).attr("src", stillURL);
    }

}

// function to append more pictures
function addMore() {
    shallAppend = true;
    mapOutput();
}

// function to map out 10 outputs from JSON
function mapOutput() {
    if (!shallAppend) {
        $("#result-area").empty();
        animal = $(this).attr("data-name");
        animalCounter = 0;
    } else {
        shallAppend = false;
    }

    $("#append-animal").show();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&r=a&api_key=ClnEUFEAKEdutrNEzTgBVP4Sgh6EiezM&limit=100";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (animalInfo) {
        if (parseInt(animalInfo.pagination.total_count) === 0) {
            $("#result-area").text("Invalid Entry");
        } else {
            for (var i = 0; i < 10; i++) {
                // Creates a div to hold the animal information
                var animalDiv = $("<div>");
                animalDiv.addClass("animal-info");
                // Retrieves the Rating Data
                var rating = animalInfo.data[animalCounter].rating;
                // Creates an element to have the rating displayed
                var ratingP = $("<div>");
                ratingP.addClass("label");
                // Displays the rating
                ratingP.html("<strong>Rating:</strong>" + rating.toUpperCase());
                animalDiv.append(ratingP);

                // Appends the still image and store urls of animated as well
                var imgElement = $("<img>");
                // imgElement.addClass("still-picture");
                var image = animalInfo.data[animalCounter].images.fixed_height_still.url; // still picture
                var image1 = animalInfo.data[animalCounter].images.fixed_width.url; // animation
                imgElement.attr("src", image);
                imgElement.attr("data-picurl", image1);
                imgElement.attr("data-picurl1", image);
                animalDiv.append(imgElement);

                // create favorite button
                var favoriteButton = $("<br><button>");
                favoriteButton.attr("still-pic", image);
                favoriteButton.attr("moving-pic", image1);
                favoriteButton.attr("rating", "<strong>Rating:</strong>" + rating.toUpperCase())
                favoriteButton.text("Add to Favorite");
                favoriteButton.addClass("btn favoritebtn");
                animalDiv.append(favoriteButton);

                // create download button
                var downloadB = $('<br><button class="btn downloadbtn"><img src="assets/images/download1.png" class="small-icon"></img> Download</button>');
                console.log('<br><a href="' + image + '" download><button class="btn downloadbtn"><img src="assets/images/download1.png" class="small-icon"></img> Download</button></a>');
                downloadB.attr("data-download", image);
                animalDiv.append(downloadB);

                // append the animal slide in the display area
                $("#result-area").append(animalDiv);
                animalCounter++;
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

// switching from still picture to animation
$(document).on("click", "img", picMoving);

// appending more pictures
$(document).on("click", "#append-animal", addMore);

// adding pictures to favorite
$(document).on("click", ".favoritebtn", addToFavorite);

// creates the default buttons in the beginning
$("#append-animal").hide();
createButtons();