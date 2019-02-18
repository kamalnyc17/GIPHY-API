var animals = ["cat", "dog", "falcon", "horse", "tiger", "crow", "deer", "fox", "pegion", "duck"];

//function to create animal buttons
function createButtons() {
    $(".button-area").empty();

    for(var i=0; i<animals.length; i++){
      var button = $('<button>');
      button.addClass("btn btn-info");
      button.text(animals[i]);
      $(".button-area").append(button);
    }

  }


// creates the default buttons in the beginning
createButtons();
