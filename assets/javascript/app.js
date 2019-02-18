var animals = ["cat", "dog", "falcon", "horse", "tiger", "crow", "deer", "fox", "pegion", "duck"];

// function to create animal buttons
function createButtons() {
    $(".button-area").empty();

    for(var i=0; i<animals.length; i++){
      var button = $('<button>');
      button.addClass("btn btn-info");
      button.text(animals[i]);
      $(".button-area").append(button);
    }
  }

// adding new animal as the user submits new names
$("#add-animal").on("click", function(event) {
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    var userInput = $("#animal-input").val().trim();
    animals.push(userInput);
    $("#animal-input").val("");

    // calling the function to RE-create animal buttons
    createButtons();
  });

// creates the default buttons in the beginning
createButtons();
