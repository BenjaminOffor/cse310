// ===== Questions Array (3 batches, 5 questions each) =====
const batches = [
  [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], correctOption: "4" },
    { question: "Which company created JavaScript?", options: ["Netscape", "Microsoft", "Google"], correctOption: "Netscape" },
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Markup Language", "Hyperloop Markup Language"], correctOption: "HyperText Markup Language" },
    { question: "Which operator is used for strict equality in JS?", options: ["==", "===", "="], correctOption: "===" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax"], correctOption: "Cascading Style Sheets" }
  ],
  [
    { question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()"], correctOption: "push()" },
    { question: "How do you write a comment in JavaScript?", options: ["// comment", "/* comment */", "Both"], correctOption: "Both" },
    { question: "What is the keyword for declaring a variable that cannot be reassigned?", options: ["var", "let", "const"], correctOption: "const" },
    { question: "Which symbol is used for template literals?", options: ["`", "'", '"'], correctOption: "`" },
    { question: "What is NaN in JS?", options: ["Not a Number", "New Array Name", "Null and Nothing"], correctOption: "Not a Number" }
  ],
  [
    { question: "Which array method filters elements?", options: ["map()", "filter()", "reduce()"], correctOption: "filter()" },
    { question: "Which function can convert a string to a number?", options: ["parseInt()", "Number()", "Both"], correctOption: "Both" },
    { question: "How do you add an event listener?", options: ["addEventListener()", "listen()", "onEvent()"], correctOption: "addEventListener()" },
    { question: "Which keyword creates a class?", options: ["function", "class", "object"], correctOption: "class" },
    { question: "What is the correct syntax for a JS arrow function?", options: ["() => {}", "() => ()", "{} => ()"], correctOption: "() => {}" }
  ]
];

// ===== Global variables =====
let currentBatch = 0;
let currentQuestion = 0;
let userAnswers = [];

// ===== Recursive Function to Ask Questions =====
function askQuestion() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = ""; // clear previous

    if(currentBatch >= batches.length) return showFinalScore(); // end of all batches

    const batch = batches[currentBatch];
    const q = batch[currentQuestion];

    const qElem = document.createElement("div");
    qElem.className = "question";
    qElem.innerText = `Batch ${currentBatch + 1} - Q${currentQuestion + 1}: ${q.question}`;
    quizDiv.appendChild(qElem);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => {
            try {
                if(!option) throw "Option not selected!";
                userAnswers.push({batch: currentBatch, question: currentQuestion, answer: option});
                currentQuestion++;
                if(currentQuestion >= batch.length) {
                    // Grade this batch
                    showBatchScore(currentBatch);
                    return; // exit current batch
                }
                askQuestion();
            } catch(error) {
                Swal.fire(error);
            }
        };
        optionsDiv.appendChild(btn);
    });

    quizDiv.appendChild(optionsDiv);
}

// ===== Calculate Score for a Specific Batch =====
function calculateBatchScore(batchIndex) {
    const batch = batches[batchIndex];
    let score = 0;
    batch.forEach((q, qIdx) => {
        const userAnsObj = userAnswers.find(a => a.batch === batchIndex && a.question === qIdx);
        if(userAnsObj && userAnsObj.answer === q.correctOption) score++;
    });
    return score;
}

// ===== Display Batch Score =====
function showBatchScore(batchIndex) {
    const score = calculateBatchScore(batchIndex);
    Swal.fire({
        title: `Batch ${batchIndex + 1} completed!`,
        text: `Your score: ${score} / ${batches[batchIndex].length}`,
        showConfirmButton: true
    }).then(() => {
        // move to next batch
        currentBatch++;
        currentQuestion = 0;
        askQuestion();
    });
}

// ===== Display Final Score =====
function showFinalScore() {
    let totalCorrect = 0;
    batches.forEach((batch, idx) => {
        totalCorrect += calculateBatchScore(idx);
    });
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("result").innerText = `Your final score: ${totalCorrect} / ${batches.length * 5}`;

    Swal.fire({
        title: `All batches completed!`,
        text: `Final score: ${totalCorrect} / ${batches.length * 5}`,
        showDenyButton: true,
        confirmButtonText: 'Restart Quiz',
        denyButtonText: 'Exit'
    }).then((result) => {
        if(result.isConfirmed) {
            userAnswers = [];
            currentBatch = 0;
            currentQuestion = 0;
            askQuestion();
        }
    });
}

// ===== Start Quiz =====
askQuestion();