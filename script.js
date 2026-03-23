// Quiz Questions
const quizData = [
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "<!-- -->"],
        answer: "//"
    },
    {
        question: "What method can be used to get input from the user via a prompt box?",
        options: ["alert()", "prompt()", "confirm()", "input()"],
        answer: "prompt()"
    },
    {
        question: "Which loop is guaranteed to run at least once?",
        options: ["for loop", "while loop", "do...while loop", "None of the above"],
        answer: "do...while loop"
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    }
];

let currentQuestion = 0;
let score = 0;

const quiz = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

// Display Question
function showQuestion() {
    resultDiv.innerText = '';
    nextBtn.style.display = 'none';
    quiz.innerHTML = '';
    const q = quizData[currentQuestion];

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerText = `${currentQuestion + 1}. ${q.question}`;
    quiz.appendChild(questionDiv);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    q.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(button, option);
        optionsDiv.appendChild(button);
    });

    quiz.appendChild(optionsDiv);
}

// Check Answer
function checkAnswer(button, selected) {
    const correctAnswer = quizData[currentQuestion].answer;
    if (selected === correctAnswer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // Highlight correct option
        const buttons = document.querySelectorAll('.options button');
        buttons.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Disable all buttons
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(btn => btn.disabled = true);

    // Show Next button
    nextBtn.style.display = 'inline-block';
}

// Next Question
nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Show Result
function showResult() {
    quiz.innerHTML = '';
    nextBtn.style.display = 'none';
    resultDiv.innerText = `Quiz Complete! Your score is ${score} out of ${quizData.length}.`;
    restartBtn.style.display = 'inline-block';
}

// Restart Quiz
restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    restartBtn.style.display = 'none';
    showQuestion();
}

// Initialize
showQuestion();