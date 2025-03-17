# Full Stack Web Application

## 🌟 Overview
This project is a full-stack web application built with a modern tech stack, providing seamless functionality and an intuitive user interface.

## 🚀 Features
- User authentication (Signup/Login)
- Secure token-based authentication (JWT)
- Content management
- Real-time updates
- Responsive UI
- Database integration with MongoDB

## 🛠️ Tech Stack
### Frontend
- Vite with React (TypeScript)
- Tailwind CSS
- Axios for API handling

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JSON Web Token (JWT) authentication
- Bcrypt for password hashing
- CORS for cross-origin requests
- Zod for input validation

## 📂 Project Structure
```
backend/
│
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   └── utils/
│
├── .env
├── tsconfig.json
├── package.json
└── README.md

frontend/
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── vite.config.ts
├── package.json
└── README.md
```

## 🌐 Backend Setup (Render Deployment)
1. Install dependencies:
```bash
npm install
```
2. Build the project:
```bash
npm run build
```
3. Run the project locally:
```bash
npm run dev
```
4. For Render deployment, set the **Root Directory** to `backend/`.

## 🎯 Frontend Setup (Vercel Deployment)
1. Install dependencies:
```bash
npm install
```
2. Run the project locally:
```bash
npm run dev
```
3. Deploy to Vercel by selecting the frontend directory.

## 🛡️ Environment Variables
Create a `.env` file inside the `src` folder for the backend:
```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

## 🌄 Screenshots
- Login Page
- Dashboard
- Content Cards

## 🚀 Future Enhancements
- Dark Mode
- Social Media Authentication
- User Roles and Permissions

## 🤝 Contributors
- Your Name
- Other Contributors

## 📜 License
This project is licensed under the MIT License.

