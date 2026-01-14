# MERN Task Manager Application

A full-stack Task Management application built using the MERN stack (MongoDB, Express, React, Node.js).
The application supports user authentication and task CRUD operations.

---

## Setup Instructions

# 1. Clone the repository
git clone <your-github-repo-link>
cd task-manager

# 2. Backend setup
cd backend
npm install

# create .env file (or copy from .env.example) and add:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

npm run dev

# backend will run on:
# http://localhost:5000

# 3. Frontend setup
cd ../frontend
npm install

# create .env file and add:
# VITE_API_URL=http://localhost:5000/api

npm run dev

# frontend will run on:
# http://localhost:5173
