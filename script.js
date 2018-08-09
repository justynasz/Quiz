var checkPointsBtn = document.querySelector(".check-points");
var showCorrectAnswersBtn = document.querySelector(".show-answers");
var clearBtn = document.querySelector(".clear");
var showQuestionsBtn = document.querySelector(".show-questions");
var pointsContainer = document.querySelector(".points");
var pointsSpan = document.querySelector(".points span");
const quizContainer = document.getElementById("quiz");
var points = 0;

var myQuestions = [
    {
        question: "Kto jako pierwszy opłynął kulę ziemską?",
        answers: {
            a: "Ferdynand Magellan",
            b: "Krzysztof Kolumb",
            c: "Vasco da Gama"
        },
        correctAnswer: "a"
    },
    {
        question: "Z jakiego języka pochodzi słowo piżama?",
        answers: {
            a: "Francuski",
            b: "Portugalski",
            c: "Haidi"
        },
        correctAnswer: "c"
    },
    {
        question: "Jakie miasto jest stolicą Francji?",
        answers: {
            a: "Londyn",
            b: "Monachium",
            c: "Paryż"
        },
        correctAnswer: "c"
    }
];

function buildQuiz() {
    checkPointsBtn.classList.add('show');
    showCorrectAnswersBtn.classList.add('show');
    clearBtn.classList.add('show');

    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
             <input type="radio" class="answer" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
            );
        }
        output.push(
            `<div class="slide">
           <div class="question"><p> ${currentQuestion.question} </p></div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
        );
    });
    quizContainer.innerHTML = output.join("");
    pointsContainer.classList.remove('show');
    pointsContainer.classList.add('hide');
    showQuestionsBtn.classList.add('hide');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            (++points > 3) ? points = 3: ++points;
            answerContainers[questionNumber].style.color = "lightgreen";
        } else {
            answerContainers[questionNumber].style.color = "red";
        }
    });

    pointsSpan.innerHTML = points;
    pointsContainer.classList.add('show');
}

function showAnswer() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]`;
        const answersList = (answerContainer.querySelectorAll(selector) || {});
        answersList.forEach(answer => {
            if (answer.value === currentQuestion.correctAnswer) {
                answer.checked = true;
                answerContainers[questionNumber].style.color = "lightgreen";
            }
        });
    });

    pointsSpan.innerHTML = points;
    pointsContainer.classList.add('show');
}

function clear() {
    points = 0;
    pointsContainer.classList.remove('show');
    pointsContainer.classList.add('hide');
    const answerContainers = quizContainer.querySelectorAll(".answers");
    const answers = quizContainer.querySelectorAll(".answer");
    answers.forEach(child => {
        if (child.checked) {
            child.checked = false;
        }
    });
    myQuestions.forEach((currentQuestion, questionNumber) => {
        answerContainers[questionNumber].style.color = "black";
    });
}

checkPointsBtn.addEventListener('click', showResults);
showCorrectAnswersBtn.addEventListener('click', showAnswer);
clearBtn.addEventListener('click', clear);
showQuestionsBtn.addEventListener('click', buildQuiz);
