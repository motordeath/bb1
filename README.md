🚀 Build Buddy – Project Collaboration Platform

A full-stack platform where college students can register projects, find teammates, collaborate in discussions, connect with mentors, and explore projects being built across the institute.

Build Buddy solves real student pain-points: lack of exposure, difficulty finding teammates, unclear project tracking, and no single place to explore college projects.

🧾 Table of Contents

Overview

Features

Tech Stack

System Architecture

Project Structure

Frontend (React)

Backend (Node-Express)

Database (MongoDB)

API Endpoints

Setup Instructions

Environment Variables

Screenshots

Future Enhancements

📌 Overview

Build Buddy is a full-stack web application designed for college students to:

✔ Showcase their technical projects
✔ Form teams and collaborate
✔ Chat and discuss inside project rooms
✔ Connect with mentors
✔ Search projects built by peers
✔ Build a transparent project ecosystem

The system consists of:

React + Vite frontend

Node.js + Express backend

MongoDB database

⭐ Features
🔐 Authentication

Student signup

Secure login

JWT-based session handling

🛠 Project Management

Create a project

Add description, tech stack, team size

Manage your projects

View all projects across campus

🧑‍🤝‍🧑 Teammate Finder

Search students by skills

Request to join a project

Leader approval mechanism

💬 Project Discussions

Each project has its own discussion thread

Post messages and replies

Timestamped chat history

🎓 Mentor Section

View mentors

Request guidance

Mentor-managed resources

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router

Framer Motion

Backend

Node.js

Express.js

JWT Authentication

bcrypt for hashing

Mongoose ORM

Database

MongoDB (Cloud/Local)

🧩 System Architecture
┌───────────────────┐
│   React Frontend   │
│ (Vite + Tailwind)  │
└─────────┬─────────┘
          │ Axios API
          ▼
┌───────────────────┐
│ Express Backend   │
│ (Node.js + JWT)   │
└─────────┬─────────┘
          │ Mongoose
          ▼
┌───────────────────┐
│   MongoDB Atlas    │
│ (User + Projects)  │
└────────────────────┘

📁 Project Structure
build-buddy/
│
├── backend/
│   ├── app.js                 # Main backend application file
│   ├── config.js              # Database + environment setup
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Message.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── messageController.js
│   │
│   └── package.json
│
│
├── frontend/ (inside backend/)
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── Dashboard.jsx
│       │   └── UI Components
│
└── README.md

🎨 Frontend (React)
Key Highlights

Built using Vite — extremely fast dev server

Clean component structure

Auto-detects backend URL

Tailwind CSS styling

State managed using React hooks

Reusable components for forms, lists, and UI

Important Files

App.jsx – main router + global layout

Login.jsx / Signup.jsx – authentication UI

Dashboard.jsx – main home after login

⚙ Backend (Node + Express)
Core Backend Features

JSON-based REST APIs

User authentication middleware

Controller-based route handling

Clean Mongoose models

Modular routing system

Important Files

app.js – Server + middleware setup

authRoutes.js – Login/Signup APIs

projectRoutes.js – Project CRUD APIs

messageRoutes.js – Discussion APIs

🗄 Database (MongoDB)
User Schema
{
  name: String,
  email: String,
  password: String,
  year: Number,
  skills: [String],
  projects: [ObjectId]
}

Project Schema
{
  title: String,
  description: String,
  techStack: [String],
  createdBy: ObjectId,
  members: [ObjectId],
  messages: [ObjectId]
}

Message Schema
{
  sender: ObjectId,
  projectId: ObjectId,
  content: String,
  timestamp: Date
}

🔗 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/signup	Register new student
POST	/api/auth/login	Login user
GET	/api/auth/me	Validate JWT token
Projects
Method	Endpoint	Description
POST	/api/projects/create	Create project
GET	/api/projects/all	Get all projects
GET	/api/projects/:id	Get project details
PUT	/api/projects/join/:id	Request to join
Messages
Method	Endpoint	Description
POST	/api/messages/:projectId	Add message
GET	/api/messages/:projectId	Get messages
🧰 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/motordeath05/bb
cd bb

2️⃣ Backend Setup
cd backend
npm install


Run backend:

node app.js


Backend URL:
➡ http://localhost:5000

3️⃣ Frontend Setup
cd backend/frontend
npm install
npm run dev


Frontend URL:
➡ http://localhost:5173

🔐 Environment Variables

Create a .env file in backend/:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000

🖼 Screenshots

(Add once UI is finalized — login, signup, project view, dashboard, etc.)

🚀 Future Enhancements

Real-time chat using WebSockets

AI-based teammate recommendation

Mentor scheduling system

Notification system

Automatic project ranking

Student portfolio generator