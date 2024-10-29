const quizData = [
    {
        question: "What keyword is used to declare a variable that cannot be reassigned?",
        answers: {
            a: "let",
            b: "var",
            c: "const",
            d: "immutable"
        },
        correct: "c"
    },
    {
        question: "Which array method is used to add elements to the beginning of an array?",
        answers: {
            a: "push()",
            b: "pop()",
            c: "unshift()",
            d: "shift()"
        },
        correct: "c"
    },
    {
        question: "Which method can be used to find HTML elements by class name?",
        answers: {
            a: "getElementById",
            b: "getElementsByClassName",
            c: "querySelectorAll",
            d: "queryByClass"
        },
        correct: "b"
    },
    { question: "What is the default value of an uninitialized variable in JavaScript?",
        answers: {
            a: "null",
            b: "0",
            c: "undefined",
            d: "NaN"
        },
        correct: "c"
    },
    {
        question: "Which of the following is used to define an asynchronous function?",
        answers: {
            a: "async",
            b: "await",
            c: "promise",
            d: "callback"
        },
        correct: "a"
    },
    {
        question: "What is the output of `typeof NaN`?",
        answers: {
            a: "number",
            b: "NaN",
            c: "undefined",
            d: "object"
        },
        correct: "a"
    },
    {
        question: "Which array method returns a new array with elements that pass a test?",
        answers: {
            a: "filter()",
            b: "map()",
            c: "reduce()",
            d: "forEach()"
        },
        correct: "a"
    },
    {
        question: "What will `console.log(0.1 + 0.2 === 0.3);` output?",
        answers: {
            a: "true",
            b: "false",
            c: "undefined",
            d: "0.3"
        },
        correct: "b"
    },
    {
        question: "Which JavaScript method converts JSON to a JavaScript object?",
        answers: {
            a: "JSON.parse()",
            b: "JSON.stringify()",
            c: "JSON.objectify()",
            d: "JSON.convert()"
        },
        correct: "a"
    },
    {
        question: "What is the correct way to call a function named `myFunction`?",
        answers: {
            a: "call myFunction()",
            b: "call function myFunction()",
            c: "myFunction()",
            d: "execute myFunction"
        },
        correct: "c"
    },
    {
        question: "What is the purpose of the `Array.map()` method?",
        answers: {
            a: "To find a specific item in the array",
            b: "To modify and return a new array",
            c: "To combine all elements into one value",
            d: "To remove elements based on a condition"
        },
        correct: "b"
    },
    {
        question: "How do you write a single-line comment in JavaScript?",
        answers: {
            a: "// This is a comment",
            b: "/* This is a comment */",
            c: "# This is a comment",
            d: "<!-- This is a comment -->"
        },
        correct: "a"
    },
    {
        question: "What does `DOM` stand for?",
        answers: {
            a: "Document Object Model",
            b: "Data Object Method",
            c: "Document Order Management",
            d: "Data-Oriented Model"
        },
        correct: "a"
    },
    {
        question: "How do you create a new JavaScript object?",
        answers: {
            a: "let obj = {};",
            b: "let obj = [];",
            c: "let obj = ();",
            d: "let obj = <>;"
        },
        correct: "a"
    },
    {
        question: "Which operator is used to check if two values are identical in value and type?",
        answers: {
            a: "=",
            b: "==",
            c: "===",
            d: "!=="
        },
        correct: "c"
    }
];

// Shuffles quiz questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let currentQuestion = 0;
let score = 0;
let timer;
const quizQuestions = shuffle(quizData);
const totalQuestions = quizQuestions.length;
const quizContainer = document.getElementById("quiz");
const timerDisplay = document.getElementById("time");
const currentQuestionDisplay = document.getElementById("current-question");

function loadQuestion(index) {
    const questionObj = quizQuestions[index];
    quizContainer.innerHTML = `
        <h3>${questionObj.question}</h3>
        ${Object.keys(questionObj.answers).map(key => `
            <label>
                <input type="radio" name="answer" value="${key}">
                ${questionObj.answers[key]}
            </label><br>
        `).join('')}
    `;
    startTimer();
}

function startTimer() {
    let time = 30;
    timerDisplay.textContent = time;
    timer = setInterval(() => {
        time--;
        timerDisplay.textContent = time;
        if (time <= 0) {
            clearInterval(timer);
            showFeedback(false);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const correctAnswer = quizQuestions[currentQuestion].correct;

    if (selectedAnswer && selectedAnswer.value === correctAnswer) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    currentQuestion++;
    currentQuestionDisplay.textContent = currentQuestion + 1;

    if (currentQuestion < totalQuestions) {
        loadQuestion(currentQuestion);
    } else {
        showResults();
    }
}

function showFeedback(isCorrect) {
    const feedback = document.createElement('p');
    feedback.textContent = isCorrect ? "Correct!" : "Incorrect!";
    feedback.style.color = isCorrect ? "green" : "red";
    quizContainer.appendChild(feedback);
}

function showResults() {
    quizContainer.innerHTML = `You scored ${score} out of ${totalQuestions}!`;
    document.getElementById("next").style.display = "none";
    document.getElementById("timer").style.display = "none";
}

loadQuestion(currentQuestion);
