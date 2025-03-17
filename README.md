# BrainWave 🧠 - Full Stack Web Application

## 🚀 Project Overview
BrainWave is a modern full-stack web application that allows users to manage and interact with content from platforms like Twitter and YouTube. The project leverages React with TypeScript for the frontend and Node.js with Express for the backend, with MongoDB as the database.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite with TypeScript)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Zod for validation
- JWT for authentication
- Bcrypt for password hashing

---

## 🌲 Project Structure
```
BrainWave/
│
├── frontend/  (React + Vite)
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── icons/
│       ├── pages/
│       ├── modals/
│       └── App.tsx
│
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middlewares/
│   ├── dist/ (Generated after build)
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 📦 Backend Setup

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up the environment variables in `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/brainwave
JWT_SECRET=mysecretkey
```

4. Build and Run the project:
```bash
npm run dev
```

---

## 🖼️ Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the app:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🛳️ Deployment

### Vercel (Frontend)
1. Go to Vercel Dashboard and import the frontend repository.
2. Select the root directory as `frontend`.
3. Add environment variables in Vercel settings.
4. Deploy!

### Render (Backend)
1. Go to Render Dashboard and create a new Web Service.
2. Select the backend repository.
3. Set the root directory as `backend`.
4. Add the environment variables.
5. Deploy!

---

## 🔑 Features
- User Authentication (Signup & Login)
- Secure JWT-based Authentication
- Content Management (Twitter & YouTube Embeds)
- Responsive Dashboard UI
- Smooth Modal for Adding Content

---

## 🎯 Future Enhancements
- Social Media Sharing
- Dark Mode Support
- AI-based Content Suggestions

---

## 🙌 Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.


---

## ⭐️ Show Your Support
If you liked this project, give it a ⭐️!

