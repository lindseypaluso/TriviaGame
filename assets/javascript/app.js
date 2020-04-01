
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

var oneMinute;

$(document).ready(function () {
    oneMinute = 60;
    display = $('#time');
    startTimer(oneMinute, display);
});

var correct = 0;
var wrong = 0;
var unanswered = 0;


var correctAnswersText = $("#correctanswers-text");
var wrongAnswersText = $("#wronganswers-text");
var unansweredText = $("#unanswered-text");


function getScore() {

    clearInterval(timerInterval);

    var questionNames = [
        "first-question",
        "second-question",
        "third-question",
    ]

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

    correctAnswersText.text("Correct answers: " + correct);
    wrongAnswersText.text("Wrong answers: " + wrong);
    unansweredText.text("Unanswered questions: " + unanswered);
}


$("#submit-button").click(function () {
    getScore();
});


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


$("#restart-button").click(function () {
    restart();
});