// Set a var for the Interval
var timerInterval;


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            getScore();
        }
    }, 1000);
}

// Create a var to have the timer run for one minute
var oneMinute;

// When page loads, start a countdown timer of 1 minute
$(document).ready(function(){
    oneMinute = 60;
        display = $('#time');
    startTimer(oneMinute, display);
});

// Create global vars to hold the user's correct, wrong, and unanswered results
var correct = 0;
var wrong = 0;
var unanswered = 0;

// Create global vars to reference the results text on the html
var correctAnswersText = $("#correctanswers-text");
var wrongAnswersText = $("#wronganswers-text");
var unansweredText = $("#unanswered-text");

// Function to get the score
function getScore() {
    // Stop the timer
    clearInterval(timerInterval);
    // Object referencing the question names on the html
    var questionNames = [
        "first-question",
        "second-question",
        "third-question",
    ]
    // For loop grabbing the question names and determining the correct answer for each question and adding the scores together
    for (name of questionNames) {
        var answer = $('input[name="' + name + '"]:checked').val();
        console.log(answer);
        if (answer === "Right") {
            correct++;
        } else if (answer === "Wrong") {
            wrong++;
        } else {
            unanswered++;
        }
    }
    // Display the score on the page
    correctAnswersText.text("Correct answers: " + correct);
    wrongAnswersText.text("Wrong answers: " + wrong);
    unansweredText.text("Unanswered questions: " + unanswered);
}

// When you hit the submit button, the getScore function is called
$("#submit-button").click(function() {
    getScore();
});

// Create a function to restart the game
function restart() {
    startTimer(oneMinute, display);
    oneMinute = 60;
    correct = 0;
    wrong = 0;
    unanswered = 0;
    correctAnswersText.text("Correct answers: " + correct);
    wrongAnswersText.text("Wrong answers: " + wrong);
    unansweredText.text("Unanswered questions: " + unanswered);
    $('input[type="radio"]').prop('checked', false);
};

// Calling the restart function so when you hit the restart button, the game resets
$("#restart-button").click(function() {
    restart();
});