let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false; 
let level = 0; 

$(document).keypress(function(){
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true; 
    }
});

//User Sequence 
$(".btn").click(function() {

  let userChosenColor = $(this).attr("id"); // RETURNS "red", the line above retrieves the id from the button. It looks for elements with class btn and then pulls its id. 
  userClickedPattern.push(userChosenColor); // Adds the last color, into the userClickedPattern array. Ex ["red", "blue"]

    playSound(userChosenColor); 

    changeColor(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1); //Retrieves the last index value in the array. So if you have pressed 11 buttons, the answer will be 10. 
});

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) // Ex: gamePattern[11] returns the color in the position 11 in the array, user.. does the same and it checks that the strings match
    {
      if (userClickedPattern.length === gamePattern.length){ // Makes sure the user took their turn, therefore the length of the array matches and can move on to the next Sequence 
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }

    } else {

      playSound("wrong"); // This is a function we created earlier that takes the "name" as a paramter and inputs it into the file path Ex: "/sounds.wrong.mp3"
      $("body").addClass("game-over"); // Adds .game-over class to the body, ending the game 
      $("#level-title").text("Game Over, Press Any Key to Restart")

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 400);

      startOver();
    }
}



//Computer Sequence 
function nextSequence() {
  
      //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

      level++;
    //Update h1 with incrememnet 
    $("#level-title").text("Level " + level);
  

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animate and play sound for the next color in the game pattern
    //$("#" + randomChosenColor).fadeIn(400).fadeOut(100).fadeIn(100);
    //playSound(randomChosenColor);
playSequence();
    //increment level number by 1

}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3"); // Creates a variable the represents the file path 
    sound.play();
}
function changeColor(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    };

function startOver() {
  level = 0;
  gamePattern = [];
  started = false; 
}
function playSequence() {
  let i = 0; 
 
  function playNext() {
  if (i < gamePattern.length) {
    let currentColor = gamePattern[i];
    $("#" + currentColor).fadeIn(200).fadeOut(100).fadeIn(100);
    playSound(currentColor); 
    i++;

    setTimeout(playNext, 400);
  }
}
playNext(); 

}
