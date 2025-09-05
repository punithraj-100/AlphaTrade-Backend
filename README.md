# 🚀 AlphaTrade - Backend API
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="ExpressJS" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

<p align="center">
  The robust and secure backend server powering the AlphaTrade platform.
</p>


✨ Overview
This repository contains the backend server for the AlphaTrade application. It is a modern, scalable Node.js and Express server responsible for handling user authentication, managing financial data, serving real-time information, and acting as a secure gateway for third-party services like the Google Gemini API.

Live API URL: https://alphatrade-backend-1.onrender.com

🎯 Key Features
🔐 Secure Authentication: Robust user signup and login functionality using JSON Web Tokens (JWT) and bcrypt for password hashing.

📊 Financial Data Management: Core API endpoints to create, read, and manage user holdings, positions, and watchlist data.

🤖 AI Chatbot Proxy: A secure endpoint (/ask-chatbot) that intelligently proxies requests to the Google Gemini API, protecting the secret API key from public exposure.

🔗 Database Integration: Seamlessly connects to a MongoDB Atlas cluster using Mongoose for elegant data modeling and validation.

🛡️ CORS Protection: Configured with a strict CORS policy to ensure that only authorized frontend applications can access the API.

# 🛠️ Tech Stack

## 🛠️ Tech Stack  

| Category        | Technology                              |
|-----------------|-----------------------------------------|
| **Runtime**     | Node.js                                 |
| **Framework**   | Express.js                              |
| **Database**    | MongoDB with Mongoose                   |
| **Authentication** | JWT (`jsonwebtoken`), `bcryptjs`     |
| **Middleware**  | CORS, Cookie-Parser, Dotenv             |
| **API Calls**   | node-fetch                              |
| **Deployment**  | Render                                  |


 # ⚡Local Setup
Follow these steps to run the backend locally:  

1. **Clone the repository**  
   ```bash
   git clone <your-backend-repo-url>
2.Navigate to the project directory

  cd backend

3.Install dependencies

  npm install

Create a .env file in the root of the backend folder and add the following environment variables. These are crucial for the application to run.

# Your MongoDB Atlas connection string
MONGO_URL=YOUR_MONGO_CONNECTION_STRING

# A long, random, and secret string for signing JWTs
TOKEN_KEY=YOUR_JWT_SECRET_KEY

# Your Google Gemini API Key for the chatbot
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

Start the Server

npm start

The server will start on http://localhost:3002.

🚀 Deployment
This backend is deployed as a Web Service on Render. The main branch is connected to the service, and any new push to this branch will automatically trigger a new deployment.