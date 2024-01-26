# MERN Stack Expense Tracker App

Welcome to the MERN Stack Expense Tracker App repository! This app allows users to track their income and expenses and save them to their user ID.

![Expense Tracker App](https://resources.tallysolutions.com/us/wp-content/uploads/2021/11/cogs-vs-expenses-whats-the-difference.jpg)

## Features

- Tracks income and expenses 💰
- Saves data to user IDs 📝
- Utilizes the MERN (MongoDB, Express.js, React.js, Node.js) stack 🚀

## Installation and Setup

To run this app locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/tanavposwal/expense-tracker.git
    ```

2. Navigate to the `backend` directory and create a `.env` file. Add your MongoDB URL and JWT secret token:
    ```plaintext
    URI=your_mongodb_url
    SECRET=your_jwt_secret
    ```

3. Navigate to the `frontend/src/components` directory and open `API.jsx`. Paste your API server link:
    ```javascript
    export const API = 'your_api_server_link';
    ```

4. Install dependencies:
    - For backend:
    ```bash
    cd backend
    npm install
    ```
    - For frontend:
    ```bash
    cd frontend
    npm install
    ```

5. Run the backend and frontend servers:
    - For backend:
    ```bash
    cd backend
    node main.js
    ```
    - For frontend:
    ```bash
    cd frontend
    npm run dev
    ```

6. Access the app in your browser.

## Technologies Used

- MongoDB 🍃
- Express.js ⚙️
- React.js ⚛️
- Node.js 📦
- JavaScript 💻
- HTML 🌐
- CSS 🎨


📊📈📉 Happy Expense Tracking! 🚀
