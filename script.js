// JavaScript Quiz Program - JavaScript, ES6, recursion, SweetAlert2, exception handling

// Quiz questions array
const questions = [
  { question: "What is 2 + 2?", options: ["2", "3", "4"], correct: "4" },
  { question: "Which keyword declares a variable in ES6?", options: ["var", "let", "const"], correct: "let" },
  { question: "Which array function returns a new array?", options: ["map", "forEach", "push"], correct: "map" },
  { question: "What is the result of '5' + 5 in JS?", options: ["10", "55", "NaN"], correct: "55" },
  { question: "Which symbol is used for comments in JS?", options: ["//", "/* */", "#"], correct: "//" }
];

// Store user's answers
let userAnswers = [];

// Function to display a question
function displayQuestion(index) {
  const quizDiv = document.getElementById('quiz');
  quizDiv.innerHTML = ""; // Clear previous question

  try {
    if (index >= questions.length) throw "Index out of range!";
    const q = questions[index];

    const questionEl = document.createElement('h2');
    questionEl.textContent = q.question;
    quizDiv.appendChild(questionEl);

    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.onclick = () => {
        userAnswers.push(option);
        askQuestion(index + 1); // recursion
      };
      quizDiv.appendChild(btn);
    });
  } catch (error) {
    console.error("Error displaying question:", error);
  }
}

// Function to calculate score
function calculateScore() {
  const correctAnswers = questions.map(q => q.correct);
  const score = userAnswers.reduce((total, ans, i) => ans === correctAnswers[i] ? total + 1 : total, 0);

  Swal.fire({
    title: 'Quiz Completed!',
    text: `You scored ${score} out of ${questions.length}`,
    icon: 'success'
  });
}

// Start quiz with recursion
function askQuestion(index = 0) {
  if (index >= questions.length) return calculateScore();
  displayQuestion(index);
}

// Start quiz automatically
askQuestion();