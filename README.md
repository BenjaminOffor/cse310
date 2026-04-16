# JavaScript Quiz Program (Full Stack CRUD Application)

## 📌 Description

This project is a full-stack JavaScript quiz application that allows users to answer multiple-choice questions, calculates scores, and displays results dynamically.

It also includes an **admin dashboard** where authorized users can manage quiz questions using full CRUD operations (Create, Read, Update, Delete).

The application is built using **Node.js, Express, and SQLite**, and is deployed online for real-world access.

---

## 🚀 Live Demo

👉 https://cse310-javascript-quiz.onrender.com

### Admin Access

👉 https://cse310-javascript-quiz.onrender.com/login

---

## 🎯 Features

### 🧑‍🎓 User Features

* Interactive browser-based quiz
* Multiple-choice questions
* Dynamic question rendering
* Score calculation and display
* SweetAlert2 popup for results
* Clean and simple UI

---

### 🔐 Admin Features

* Login authentication system
* Add new quiz questions
* View all questions from database
* Edit existing questions
* Delete questions
* Real-time updates via API

---

### ⚙️ Backend Features

* Node.js + Express server
* RESTful API (GET, POST, PUT, DELETE)
* SQLite database integration (better-sqlite3)
* Automatic database initialization & seeding
* Static file hosting via Express
* Deployed on Render

---

## 🧠 Concepts Demonstrated

* ES6 JavaScript (map, reduce, arrow functions)
* Recursion
* DOM manipulation
* REST API integration
* Client-server architecture
* CRUD operations
* Database integration (SQLite)
* Deployment and cloud hosting

---

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/BenjaminOffor/cse310.git
```

2. Navigate into the project folder:

```bash
cd cse310
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node server.js
```

5. Open in browser:

```bash
http://localhost:3000
```

---

## 📖 Usage

### User

1. Open the quiz page
2. Answer questions by selecting options
3. View final score in popup

### Admin

1. Go to `/login`
2. Enter credentials:

   * Username: `admin`
   * Password: `1234`
3. Manage quiz questions (add/edit/delete)

---

## 🗂 Project Structure

```bash
cse310/
│
├── server.js          # Backend server (Express + SQLite)
├── quiz.db            # SQLite database
├── index.html         # Quiz interface
├── admin.html         # Admin dashboard
├── login.html         # Admin login page
├── style.css          # Styling (if applicable)
└── README.md
```

---

## 🎥 Video Demo

👉 https://www.youtube.com/watch?v=oS--WGhH5ww

---

## ⚠️ Notes

* The application uses SQLite, which may reset data on redeployment when hosted on Render.
* This project is intended for educational purposes and demonstrates full-stack development concepts.

---

## 👨‍💻 Author

Benjamin Offor

---
