const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname)));

// ======================
// DATABASE (FIXED FOR RENDER)
// ======================
const db = new Database(path.join(__dirname, 'quiz.db'));

// ======================
// INIT DATABASE
// ======================

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch INTEGER,
    question TEXT,
    option1 TEXT,
    option2 TEXT,
    option3 TEXT,
    option4 TEXT,
    correct_option TEXT
  )
`).run();

// Seed database safely
const count = db.prepare("SELECT COUNT(*) as count FROM questions").get();

if (!count || count.count === 0) {
  console.log("Seeding database...");

  db.prepare(`
    INSERT INTO questions (batch, question, option1, option2, option3, option4, correct_option)
    VALUES
    (1, 'What does HTML stand for?', 'HyperText Markup Language', 'Hyper Trainer Markup Language', 'Home Tool Markup Language', 'Hyperlink Tool Machine Language', 'HyperText Markup Language'),
    (1, 'Which language runs in the browser?', 'Java', 'C', 'Python', 'JavaScript', 'JavaScript'),
    (2, 'Which keyword creates a class?', 'function', 'class', 'object', 'module', 'class'),
    (2, 'What is NaN in JavaScript?', 'Not a Number', 'Null', 'Undefined', 'None', 'Not a Number')
  `).run();

  console.log("Sample questions inserted");
}

// ======================
// ROUTES
// ======================

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const adminUser = "admin";
  const adminPass = "1234";

  if (username === adminUser && password === adminPass) {
    return res.json({ success: true, message: "Login successful" });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

// GET ALL QUESTIONS
app.get('/questions', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM questions").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD QUESTION
app.post('/questions', (req, res) => {
  const {
    batch,
    question,
    option1,
    option2,
    option3,
    option4,
    correct_option
  } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO questions
      (batch, question, option1, option2, option3, option4, correct_option)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      batch,
      question,
      option1,
      option2,
      option3,
      option4,
      correct_option
    );

    res.json({
      message: "Question added successfully",
      id: info.lastInsertRowid
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE QUESTION
app.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  const {
    batch,
    question,
    option1,
    option2,
    option3,
    option4,
    correct_option
  } = req.body;

  try {
    db.prepare(`
      UPDATE questions
      SET batch = ?,
          question = ?,
          option1 = ?,
          option2 = ?,
          option3 = ?,
          option4 = ?,
          correct_option = ?
      WHERE id = ?
    `).run(
      batch,
      question,
      option1,
      option2,
      option3,
      option4,
      correct_option,
      id
    );

    res.json({ message: "Question updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE QUESTION
app.delete('/questions/:id', (req, res) => {
  const { id } = req.params;

  try {
    db.prepare("DELETE FROM questions WHERE id = ?").run(id);
    res.json({ message: "Question deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// START SERVER (RENDER SAFE)
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});