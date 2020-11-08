//this is an array. here are the questions, choices, and correct answers.      
var questions = [{
        title: "Which of the following is not a data type supported by JavaScript?",
        choices: ["CAT", "Undefined", "Null", "String"],
        answer: "CAT"
    },
    {
        title: "What are the two scopes that JavaScript variables have, called?",
        choices: ["Batman and Robin", "Mario and Luigi", "Global Variables and Local Variables", "Cat and Mouse"],
        answer: "Global Variables and Local Variables"
    },
    {
        title: "What are the two types of Typed Languages?",
        choices: ["Dynamically and Statistically", "Car and Gas", "Bird and Park", "Baseball and Basketball"],
        answer: "Dynamically and Statistically"
    },
    {
        title: "Which of the following is not a JavaScript Framework?",
        choices: ["Angular", "React", "Vue", "Ohio"],
        answer: "Ohio"
    },
    {
        title: "Who created JavaScript?",
        choices: ["My Dad", "Brendan Eich", " Josiah Franklin", "My Mom"],
        answer: "Brendan Eich"
    }
]

//numerical variables for the function, scores, and timers 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//clicking the start button begins the timer.
function start() {

    timeLeft = 75;
    document.getElementById("countdown").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("countdown").innerHTML = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//timer stops at end of game. 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>Your score is ` + ((score/50)*100) +  `%!</h3>
    <h3>That means you got ` + score / 10 +  ` out of 5 questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setMS()">Set score!</button>`;

    document.getElementById("main-Body").innerHTML = quizContent;
}

//storing the scores
function setMS() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getMS();
}


function getMS() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("main-Body").innerHTML = quizContent;
}

//clears the score name
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//resets the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("countdown").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz by Abdinajib
    </h1>
    <h3>
        Click if you DARE!!  
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("main-Body").innerHTML = quizContent;
}

//deducts 10 seconds from the timer for incorrect answers
function incorrect() {
    timeLeft -= 10; 
    next();
}

//increases the score for correct answer
function correct() {
    score += 10;
    next();
}

//questions loop 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("main-Body").innerHTML = quizContent;
}