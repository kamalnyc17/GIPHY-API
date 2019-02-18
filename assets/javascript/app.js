var animals = ["cat", "dog", "falcon", "horse", "tiger", "crow", "deer", "fox", "pegion", "duck"];

// function to map out 10 outputs from JSON
function mapOutput() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&r=a&api_key=ClnEUFEAKEdutrNEzTgBVP4Sgh6EiezM&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (animalInfo) {
            if (animalInfo.Error) {
                $(".result-area").text("Invalid Entry");
        } else {
            $(".result-area").text(JSON.stringify(animalInfo));
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