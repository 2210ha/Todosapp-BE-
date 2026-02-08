# Todosapp Backend API

A simple Todo REST API built with **Hono** and **Supabase**.  
This project is created for learning backend development with Node.js and TypeScript.

---

## 🚀 Tech Stack

- Node.js
- TypeScript
- Hono
- Supabase
- dotenv

---

## ✨ Features

- Create a new todo
- Get all todos
- Get a todo by ID
- Update a todo
- Delete a todo
- Store data with Supabase

---

## 📂 API Endpoints

### Get all todos
GET /todos

### Create a new todo
POST /todos

Example body:
{
  "title": "Learn backend",
  "content": "Build Todo API"
}

### Get todo by ID
GET /todos/:id

### Update a todo
PUT /todos/:id

### Delete a todo
DELETE /todos/:id

---

## ⚙️ Setup

### Clone
git clone https://github.com/2210ha/Todosapp-BE-.git
cd Todosapp-BE-

### Install
npm install

### Environment
Create `.env` file:
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=3000

---

### Run
npm run dev

Server: http://localhost:3000

---

## 👤 Author

GitHub: https://github.com/2210ha
