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

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// ======================
// DATABASE (Render-safe)
// ======================
const dbPath = path.join(__dirname, 'quiz.db');
console.log("Using DB at:", dbPath);

const db = new Database(dbPath);

// ======================
// INIT DATABASE
// ======================
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

// ======================
// SEED DATA
// ======================
try {
  const existing = db.prepare("SELECT 1 FROM questions LIMIT 1").get();
  console.log("DB initialized");

  if (!existing) {
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
} catch (err) {
  console.log("DB seed error:", err.message);
}

// ======================
// PAGE ROUTES (🔥 IMPORTANT FIX)
// ======================

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Optional home route
app.get('/', (req, res) => {
  res.send("Quiz API running");
});

// ======================
// API ROUTES
// ======================

// LOGIN API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const adminUser = "admin";
  const adminPass = "1234";

  if (username === adminUser && password === adminPass) {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false });
});

// GET QUESTIONS
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
  const { batch, question, option1, option2, option3, option4, correct_option } = req.body;

  try {
    const info = db.prepare(`
      INSERT INTO questions
      (batch, question, option1, option2, option3, option4, correct_option)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(batch, question, option1, option2, option3, option4, correct_option);

    res.json({ message: "Added", id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  const { batch, question, option1, option2, option3, option4, correct_option } = req.body;

  try {
    db.prepare(`
      UPDATE questions
      SET batch=?, question=?, option1=?, option2=?, option3=?, option4=?, correct_option=?
      WHERE id=?
    `).run(batch, question, option1, option2, option3, option4, correct_option, id);

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/questions/:id', (req, res) => {
  try {
    db.prepare("DELETE FROM questions WHERE id=?").run(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});