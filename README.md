# Ecommerce_Sustainable 🌱

A sustainable e-commerce platform designed to promote eco-friendly products and practices. This project leverages modern web technologies to provide a seamless shopping experience while emphasizing environmental responsibility.

---
🎥 [Watch Demo Video](https://drive.google.com/file/d/1DaBeMogxqvIaefJIFMBSSOi0y695dJzP/view?usp=drive_link)

## ✅ Features

- 🔐 **User Authentication** – Secure registration and login  
- 📦 **Product Management** – CRUD operations for eco-friendly items  
- 🛒 **Shopping Cart** – Add/remove/manage cart items  
- 💳 **Order Processing** – Seamless checkout and order tracking  
- 🛠️ **Admin Dashboard** – Manage users, products, and orders  
- 📱 **Responsive UI** – Works across all device sizes  

---

## 🛠 Technologies Used

### Frontend:
- HTML, CSS, JavaScript  
- React.js  

### Backend:
- Node.js  
- Express.js  

### Database:
- MongoDB  

### Other Tools:
- JWT (JSON Web Tokens) – for authentication  
- dotenv – for managing environment variables  

---

## 📁 Project Structure

```
Ecommerce_Sustainable/
├── client/             # Frontend source code (React)
├── config/             # Configuration files
├── controllers/        # API route controllers
├── helpers/            # Utility/helper functions
├── middlewares/        # Express middlewares
├── models/             # MongoDB models with Mongoose
├── routes/             # Application routes
├── .env                # Environment variables
├── package.json        # Project metadata and backend dependencies
└── server.js           # Backend entry point
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

## 🧩 Installation Steps

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SaiVarshitha123-maroju/Ecommerce_Sustainable.git
cd ECOMMERCE-APP
```

### 2️⃣ Install Backend Dependencies

Run the following command in the root directory:

```bash
npm install
```

---

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT = 8080
MONGO_URL=mongodburl
JWT_SECRET= yourapikey
GENERATE_SOURCEMAP=false
BRAINTREE_MERCHANT_ID=braintree_id
BRAINTREE_PUBLIC_KEY=braintree_publickey
BRAINTREE_PRIVATE_KEY=braintree_privatekey
```

Replace the placeholder values with your actual credentials.

---

### 4️⃣ Start the Backend Server

Run the backend server with:

```bash
npm start
```

The backend will run at: [http://localhost:5000](http://localhost:5000)

---

### 5️⃣ Set Up the Frontend

Install frontend dependencies and start the React app:

```bash
cd client
npm install
npm start
```

The frontend will run at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

To run backend or frontend tests (if implemented):

```bash
npm test
```

---

## 🙌 Acknowledgements

This project is built with ❤️ by **Sai Varshitha** and contributors.  
Inspired by sustainable commerce and the mission to build a greener digital future.

---
