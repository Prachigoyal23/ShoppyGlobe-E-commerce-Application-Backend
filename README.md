# 🛍️ ShoppyGlobe-E-commerce-Application-Backend

This project is a backend for the ShoppyGlobe application. It includes RESTful APIs built using Node.js, Express.js, and MongoDB. It supports user registration, login, product management, and a cart system with JWT-based authentication.

---

# 📁 Project Structure
📦ShoppyGlobe-E-commerce-Backend
   ├── controllers
   |   ├──authController.js
   |   ├──cartController.js
   |   ├──productController.js
   ├── middleware
   |   ├──isAdmin.js
   |   ├──verifyToken.js
   ├── models
   |   ├──Cart.js
   |   ├──Product.js
   |   ├──User.js
   ├── routes
   |   ├──authRoutes.js
   |   ├──cartRoutes.js
   |   ├──productRoutes.js
   ├── app.js
   ├── README.md
   ├── server.js
   
---

# 🚀 Setup Instructions

1. Clone the Repo

    ```bash
    git clone https://github.com/Prachigoyal23/ShoppyGlobe-E-commerce-Application-Backend.git
    cd ShoppyGlobe-E-commerce-Application-Backend

2. Install Dependencies

   ```bash
   npm install

3. Configure .env

   Create a .env file and add:

   ```bash
   PORT=5002
   MONGO_URL=mongodb://127.0.0.1:27017/shoppyglobe
   JWT_SECRET=your_jwt_secret_key

4. Start the Server

   ```bash
   node index.js

Server will run at:

http://localhost:5002

---

# ✅ Features

    🔐 JWT-based Authentication

    👤 User Roles: admin, user

    📦 Product CRUD (Admin only)

    🛒 Cart operations (Logged-in users)

    ⚙️ MongoDB CRUD operations

    📥 Tested via ThunderClient

