
$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
  $(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
  event.preventDefault();  // added line to test issue on GitHub Viewer
  clickSound.play();
  generateHTML();

  timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
  answeredQuestion = true;
  clickSound.play();
  selectedAnswer = $(this).text();
  if(selectedAnswer === correctAnswers[questionCounter]) {
    alert("correct");

    clearInterval(theClock);
    generateWin();
  }
  else {
    //alert("wrong answer!");
    clearInterval(theClock);
    generateLoss();
  }
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
  clickSound.play();
  resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
  questionCounter++;
  generateHTML();
  counter = 30;
  timerWrapper();
  }
  else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What gives wine it's color?", "What is Chardonnay?", "How long does it take before a new grapevine would bear fruit suited to winemaking?", "What is the dominant grape in Chianti wines?", "Black pepper, plum and blackberry flavors describe which wine?", "What does appellation refer to in France?", "Which does NOT necessarily mean a spoiled bottle of wine?", "By law, the word Reserve may only be placed on which US made wines?"];
var answerArray = [["Skin of Grape", "Stems", "Barrell", "Food Coloring"], ["A City","Variety of Grape","Wine color","The brand name"], ["6 months to 1 year", "20-30 years", "3-5 years", "80 years"], ["Dolcetto","Zinfandel","Sangiovese","Merlot"], ["Beaujolais", "Pinot Grigio", "Sancerre", "Shiraz"], ["Place of origin of the wine","Wines with an apple flavor","Wines from the mountains","A brand of wine"], ["Moldy Smell", "Bottle Stink", "Vinegar Smell", "Noble Rot"], ["Rare vintages available only to select clients","Wines aged at least 10 years before being released","Single Variety Wines","Any Wine"]];
var imageArray = ["<img class='center-block img-right' src='img/australia.png'>", "<img class='center-block img-right' src='img/liberia.png'>", "<img class='center-block img-right' src='img/taiwan.png'>", "<img class='center-block img-right' src='img/japan.png'>", "<img class='center-block img-right' src='img/china.png'>", "<img class='center-block img-right' src='img/turkey.png'>", "<img class='center-block img-right' src='img/colombia.png'>", "<img class='center-block img-right' src='img/india.png'>"];
var correctAnswers = ["A. Skin of Grape", "B. Variety of Grape", "C. 3-5 years", "C. Sangiovese", "D. Shiraz", "A. Place of origin of the wine", "B. Bottle Stink", "D. Any Wine"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");