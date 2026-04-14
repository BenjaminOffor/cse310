# JavaScript Quiz Program (Full Stack CRUD Application)

## Description
A full-stack JavaScript quiz program that allows users to answer multiple-choice questions, calculates scores, and displays results using SweetAlert2. The system also includes an admin dashboard for managing quiz questions using full CRUD operations (Create, Read, Update, Delete) with a Node.js, Express, and SQLite backend.

Demonstrates ES6 features, recursion, exception handling, DOM manipulation, REST API usage, and database integration.

## Features
- Browser-based quiz interface
- Uses ES6 array functions (`map`, `reduce`)
- Recursive function to iterate through questions
- Exception handling for errors
- SweetAlert2 for final score display
- Basic CSS styling

### Admin Features
- Secure login system for admin access
- Add new quiz questions
- View all questions from database
- Edit existing questions
- Delete questions
- Real-time updates using REST API

### Backend Features
- Node.js + Express server
- SQLite database integration
- REST API (GET, POST, PUT, DELETE)
- Static file hosting via Express
- LocalStorage-based session handling

## Installation
1. Clone the repository: 
git clone https://github.com/BenjaminOffor/cse310.git

2. Navigate into the project folder:
cd cse310

3. Install dependencies:
npm install

4. Start the server:
node server.js

5. Open in browser:
http://localhost:3000/index.html

## Usage
1. Answer the questions by clicking the buttons.
2. The score will display in a popup at the end.
3. Admin can log in to manage questions (add, edit, delete).

## Video Demo
https://www.youtube.com/watch?v=oS--WGhH5ww