# OnlineJudge API

This project consists of an Online Judge API built with **Express.js** and **MongoDB**. The API is designed to power an online competitive programming platform. It follows the **MVC (Model-View-Controller)** architecture to ensure a clean separation of concerns and maintainable code structure.

## 🚀 Features
- **User authentication with JWT**
- **Code execution using Judge0**
- **Swagger API documentation**
- **MongoDB for data storage**
- **Docker support for easy setup**

## 📖 Documentation Endpoints
- `GET /api/docs` → Access the Swagger documentation for the API.
- `GET /api/docs.json` → View the API documentation in JSON format.

## 🛠️ Technologies Used
- **Express.js** - Fast and minimalistic web framework for Node.js
- **MongoDB** - NoSQL database for storing user data and submissions
- **Docker** - Containerized deployment for seamless setup
- **Judge0** - Open-source online code execution system

## 🏁 Getting Started

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Thurzinhu/OnlineJudgeAPI.git
cd OnlineJudgeAPI
```

### 2️⃣ Set up environment variables
Create a `.env` file in the root directory and add the following:
```env
MOUNT_PATH=./problems
DATABASE_CONNECTION_STRING=mongodb://mongo:27017
JUDGE0_URI=http://judge0:2358
JUDGE0_CALLBACK_URL=http://submission-webhook:4000
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

To generate secure JWT secrets, run the following commands in your terminal:
```sh
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the two generated keys and replace `<your_access_token_secret>` and `<your_refresh_token_secret>` in the `.env` file.

### 3️⃣ Run the application
Ensure you have **Docker** installed, then start the services:
```sh
docker compose up -d
```

### 4️⃣ Access the API
Once the application is running, open your browser or an API client (such as Postman) and navigate to:
```
http://localhost:3500/api/docs
```
This will open the **Swagger documentation** where you can test the API endpoints.