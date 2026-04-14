const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// SERVE FRONTEND FILES
// ======================
app.use(express.static(path.join(__dirname)));

// ======================
// DATABASE
// ======================
const db = new sqlite3.Database('./quiz.db');

// ======================
// INIT DB
// ======================
db.serialize(() => {

  db.run(`
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
  `);

  db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
    if (err) return console.log(err.message);

    if (row.count === 0) {
      db.run(`
        INSERT INTO questions (batch, question, option1, option2, option3, option4, correct_option)
        VALUES
        (1, 'What does HTML stand for?', 'HyperText Markup Language', 'Hyper Trainer Markup Language', 'Home Tool Markup Language', 'Hyperlink Tool Machine Language', 'HyperText Markup Language'),
        (1, 'Which language runs in the browser?', 'Java', 'C', 'Python', 'JavaScript', 'JavaScript'),
        (2, 'Which keyword creates a class?', 'function', 'class', 'object', 'module', 'class'),
        (2, 'What is NaN in JavaScript?', 'Not a Number', 'Null', 'Undefined', 'None', 'Not a Number')
      `);

      console.log("Sample questions inserted");
    }
  });
});

// ======================
// ROUTES
// ======================

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const adminUser = "admin";
  const adminPass = "1234";

  if (username === adminUser && password === adminPass) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// GET QUESTIONS
app.get('/questions', (req, res) => {
  db.all("SELECT * FROM questions", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
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

  const sql = `
    INSERT INTO questions
    (batch, question, option1, option2, option3, option4, correct_option)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql,
    [batch, question, option1, option2, option3, option4, correct_option],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Question added successfully",
        id: this.lastID
      });
    }
  );
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

  const sql = `
    UPDATE questions
    SET batch = ?,
        question = ?,
        option1 = ?,
        option2 = ?,
        option3 = ?,
        option4 = ?,
        correct_option = ?
    WHERE id = ?
  `;

  db.run(sql,
    [batch, question, option1, option2, option3, option4, correct_option, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Question updated successfully" });
    }
  );
});

// DELETE QUESTION
app.delete('/questions/:id', (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM questions WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Question deleted successfully" });
  });
});

// ======================
// START SERVER (LAST)
// ======================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});