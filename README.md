GripInvest Backend

📌Project Overview

GripInvest is a backend application for managing investment products.
It includes user authentication, admin product management, investment tracking, and activity logs.

    1.This project is built with:

    2.Node.js + Express.js – API server

    3.MySQL + Sequelize ORM – database

    4.JWT Authentication – secure login system

    5.Jest + Supertest – testing framework

    6.Dotenv – environment configuration

⚙️ Tech Stack

Backend: Node.js, Express.js

    1.Database: MySQL, Sequelize ORM

    2.Authentication: JWT (JSON Web Tokens)

    3.Testing: Jest, Supertest

    4.Logging: Custom middleware

📂 Project Structure

gripinvest-backend/

├── src/
│ ├── config/ # Database config
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Middlewares (auth, logger)
│ ├── models/ # Sequelize models
│ ├── routes/ # API routes
│ ├── utils/ # Helpers (AI, etc.)
│ └── app.js # Express app
│
├── **tests**/ # Test cases
├── coverage/ # Test coverage reports
├── GripInvest.postman_collection.json # Postman collection
├── .env.example # Example env file
├── seed.js # DB seeding script
├── package.json
└── README.md

🚀 Setup Instructions

1. Clone Repo & Install Dependencies

git clone https://github.com/ArpitPal19/gripinvest_winter_internship_backend

cd gripinvest-backend

npm install

2. Setup Environment

Create a .env file in project root (or copy .env.example):

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASS=yourpassword

DB_NAME=gripinvest

JWT_SECRET=supersecretkey

ADMIN_EMAIL=admin@example.com

ADMIN_PASSWORD=adminpass123

3. Setup Database

   1.Ensure MySQL is running.

   2.Create database manually (if not auto-created):

   CREATE DATABASE gripinvest;

4. Seed Database

   npm run seed

This creates:

1.Admin user (from .env)

2.Sample investment products

5. Run Development Server

   npm run dev

🔑 API Endpoints

Auth

POST /api/auth/signup – user signup

POST /api/auth/login – user/admin login

GET /api/auth/profile – get user profile (requires token)

Products

GET /api/products – list all products

POST /api/products – create product (admin only)

PUT /api/products/:id – update product (admin only)

DELETE /api/products/:id – delete product (admin only)

Investments

POST /api/investments – invest in product

GET /api/investments/portfolio – view user’s portfolio

Logs

GET /api/logs – view system logs (admin only)

🧪 Testing

1. Automated Tests (Jest + Supertest)

Run:

    npm run test

Tests in **tests**/

Coverage in /coverage

Open coverage in browser:

    cd coverage/lcov-report

    start index.html   # Windows

    open index.html    # Mac/Linux

2. Manual API Testing (Postman)

   1.mport GripInvest.postman_collection.json in Postman.

   2.Login to get token (user) or adminToken (admin).

   3.Paste into Postman collection variables.

   4.Run all requests easily. ✅

📦 Deliverables

1.Source Code (with tests)

2. .env.example

3.GripInvest.postman_collection.json

4.Coverage Report (/coverage)

5.README.md (this file)
