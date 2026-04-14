let batches = [];
let currentBatch = 0;
let currentQuestion = 0;
let userAnswers = [];

// 1. Load questions from SQL backend
fetch("http://localhost:3000/questions")
  .then(res => res.json())
  .then(data => {
    // 2. Group questions into batches
    batches = groupByBatch(data);
    askQuestion();
  });

// Helper: convert flat SQL data into batch structure
function groupByBatch(data) {
  const grouped = {};

  data.forEach(q => {
    if (!grouped[q.batch]) grouped[q.batch] = [];
    grouped[q.batch].push({
      question: q.question,
      options: [q.option1, q.option2, q.option3],
      correctOption: q.correct_option
    });
  });

  return Object.values(grouped);
}

// ===== Ask Question (same logic, upgraded) =====
function askQuestion() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  if (currentBatch >= batches.length) return showFinalScore();

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
        if (!option) throw "Option not selected!";

        userAnswers.push({
          batch: currentBatch,
          question: currentQuestion,
          answer: option
        });

        currentQuestion++;

        if (currentQuestion >= batch.length) {
          showBatchScore(currentBatch);
          return;
        }

        askQuestion();
      } catch (error) {
        Swal.fire(error);
      }
    };

    optionsDiv.appendChild(btn);
  });

  quizDiv.appendChild(optionsDiv);
}

// ===== Batch Score =====
function calculateBatchScore(batchIndex) {
  const batch = batches[batchIndex];
  let score = 0;

  batch.forEach((q, qIdx) => {
    const userAns = userAnswers.find(
      a => a.batch === batchIndex && a.question === qIdx
    );

    if (userAns && userAns.answer === q.correctOption) score++;
  });

  return score;
}

// ===== Show Batch Score =====
function showBatchScore(batchIndex) {
  const score = calculateBatchScore(batchIndex);

  Swal.fire({
    title: `Batch ${batchIndex + 1} completed!`,
    text: `Your score: ${score} / ${batches[batchIndex].length}`,
    showConfirmButton: true
  }).then(() => {
    currentBatch++;
    currentQuestion = 0;
    askQuestion();
  });
}

// ===== Final Score =====
function showFinalScore() {
  let totalCorrect = 0;

  batches.forEach((batch, idx) => {
    totalCorrect += calculateBatchScore(idx);
  });

  document.getElementById("quiz").innerHTML = "";
  document.getElementById("result").innerText =
    `Your final score: ${totalCorrect} / ${batches.length * 5}`;

  Swal.fire({
    title: "All batches completed!",
    text: `Final score: ${totalCorrect} / ${batches.length * 5}`,
    showDenyButton: true,
    confirmButtonText: "Restart Quiz",
    denyButtonText: "Exit"
  }).then(result => {
    if (result.isConfirmed) {
      userAnswers = [];
      currentBatch = 0;
      currentQuestion = 0;
      askQuestion();
    }
  });
}