# Product Inventory Management System

A full-stack Product inventory management application with authentication, OTP verification, and product CRUD operations.

---

## 📌 Overview

This project allows users to:

* Register with OTP verification 📩
* Login securely 🔐
* Add, edit, delete products 🛒
* Search and filter products 🔍
* View product details 📄
* Track inventory analytics 📊

---
## 🌐 Deployment

The application is fully deployed:

* 🔹 **Frontend:** Vercel
* 🔹 **Backend + Database:** Render

### ⚠️ Important Note (Render Cold Start)

The backend is hosted on Render’s free tier, which may go to sleep after inactivity.

👉 When you open the app for the first time:

* The backend may take **30–60 seconds to wake up**
* During this time, API requests might feel slow

⏳ Please wait a moment — after waking up, the app works smoothly.

---


## 🛠️ Tech Stack

### 🔹 Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast

### 🔹 Backend

* Node.js
* Express.js

### 🔹 Database

* PostgreSQL

---

## 📂 Project Structure

```
frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/
  │   ├── types/
  │   └── utils/

backend/
  ├── controllers/
  ├── routes/
  ├── middleware/
  ├── db/
  └── app.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/product-inventory-system.git
cd product-inventory-system
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

---

### 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```
PORT=5000
JWT_SECRET=
RESEND_API_KEY=
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=
NODE_ENV=
DATABASE_URL=
```

---

## 🗄️ Database Configuration (PostgreSQL)

### 1️⃣ Create Database

```sql
CREATE DATABASE inventory_db;
```

---

### 2️⃣ Enable UUID Extension (Required)

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

### 3️⃣ Create Tables

#### 📦 Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  description TEXT
);
```

---

#### 👤 Users Table

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  email_verification_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ▶️ Run Backend

```bash
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers → OTP sent to email
2. User verifies OTP
3. User logs in → JWT stored
4. Protected routes enabled

---

## ✨ Features

### 📦 Product Management

* Add product
* Edit product (modal)
* Delete product
* View details

### 🔍 Search & Filter

* Search by name
* Filter by category

### 📊 Dashboard

* Total Inventory Value
* Active Categories
* Low Stock Alerts

---

## 📸 Screenshots

* Dashboard
<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/d9d0448f-77d5-48bb-beb7-ae896c2392d7" />

* Product Table
<img width="1204" height="411" alt="image" src="https://github.com/user-attachments/assets/9d039f8d-c0c0-4b85-9ffe-035c8480600c" />


* Edit Modal
<img width="1260" height="924" alt="image" src="https://github.com/user-attachments/assets/f9aeabd1-bffd-4575-9f6c-81fc5c8b8751" />

* OTP Page

  <img width="802" height="575" alt="image" src="https://github.com/user-attachments/assets/be1836cc-76e3-404c-a258-2bfe1cb8e57e" />



---


## 🧠 Learnings

* Full-stack architecture
* API design & integration
* Authentication with JWT
* OTP system implementation
* TypeScript best practices

---


## 👨‍💻 Author

**Ansh Sharma**
B.Tech CSE | Full Stack Developer

---

⭐ If you like this project, give it a star!
