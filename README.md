
# 📝 Task Manager Application

A full-stack task management app built with:

✅ Vue 3 + TypeScript (Frontend)  
✅ Pinia for state management  
✅ Firebase Authentication (Email/Password)  
✅ Node.js + Express + TypeScript (Backend API)  
✅ JWT Authentication using Firebase ID Tokens  

---

## 📁 Project Structure

```
task-manager/
├── server/        # Express + Node.js + TypeScript API
└── client/       # Vue 3 + TypeScript SPA
```

---

# 🚀 Getting Started

## 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Firebase Project](https://firebase.google.com/) set up for Authentication
- [npm](https://www.npmjs.com/) comes with Node.js

---

# 🌐 Frontend Setup (Vue 3 + TypeScript)

### Navigate to frontend folder:

```bash
cd client
```

### Install dependencies:

```bash
npm install
```

### Configure Firebase:

add firebase credentials in `client/.env`

### Run development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```
---

# 🔥 Backend Setup (Express + Node.js + TypeScript)

### Navigate to backend folder:

```bash
cd server
```

### Install dependencies:

```bash
npm install
```

### Configure Environment:

Create a `.env` file with:

```
PORT=7800
```

### Configure firebase admin sdk:
```
I have commited this file to github for demo purpose. (should not be done in production)

In production you should:

Download the serviceAccountKey.json file from the firebase console.

CI/CD should place this file in server/src/serviceAccountKey.json
```

### Run development server:

```bash
npm run dev
```

The API will be available at:

```
http://localhost:7800/api
```

# 🔑 Authentication Flow

- Frontend uses Firebase Authentication (Email/Password)
- After login, a Firebase ID token is generated
- All API requests send:  

```
Authorization: Bearer <idToken>
```

- Backend verifies tokens using Firebase Admin SDK

---

### Run E2E Tests:

```bash
cd client
npx playwright test
```

# 📌 Useful Scripts

### Frontend

| Action               | Command              |
|----------------------|---------------------|
| Install packages     | `npm install`       |
| Run dev server       | `npm run dev`       |
| Build production     | `npm run build`     |
| Run E2E tests        | `npx playwright test` |

### Backend

| Action               | Command              |
|----------------------|---------------------|
| Install packages     | `npm install`       |
| Run dev server       | `npm run dev`       |

---

# 🎯 Project Features

✅ Task CRUD operations  
✅ Filter, Search, and Sort tasks  
✅ Firebase Email/Password authentication  
✅ JWT-protected API with Express  
✅ Responsive UI with Bootstrap  
✅ Toast notifications & global loader  
✅ Full E2E test coverage  

---

# ❓ Need Help?

Feel free to reach out if you face any issues during setup or development.

---

# 🎉 Enjoy building with Task Manager!
