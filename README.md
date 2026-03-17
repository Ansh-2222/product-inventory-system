# 🚀 Works Mentor – Product Inventory Management System

A full-stack **Product Inventory Management System** built with modern technologies, featuring authentication, OTP verification, and a clean, responsive UI.

---

## 📌 Overview

Works Mentor is a scalable web application that enables users to efficiently manage products with a seamless and secure experience.

Users can:

* Register with OTP-based email verification 📩
* Login securely using JWT 🔐
* Add, update, and delete products 🛒
* Search and filter products 🔍
* View detailed product information 📄

This project demonstrates **end-to-end full-stack development**, clean architecture, and real-world UX patterns.

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* React Router DOM
* React Hot Toast

### 🔹 Backend

* Node.js
* Express.js

### 🔹 Database

* PostgreSQL

### 🔹 Tools & Utilities

* Axios
* JWT Authentication
* OTP Email Service (Resend/Nodemailer)

---

## ✨ Features

### 🔐 Authentication

* User registration with OTP verification
* Secure login using JWT tokens
* Protected routes for authorized access

### 📦 Product Management

* Add new products
* Edit existing products
* Delete products with confirmation
* View product details on a dedicated page

### 🔍 Search & Filter

* Search products by name
* Filter products by category (dropdown)

### 🎨 UI/UX

* Clean and minimal design
* Responsive across devices
* Loading states & empty states
* Toast notifications for feedback
* Smooth OTP input experience

---

## 📂 Project Structure

```
client/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/
  │   └── utils/

server/
  ├── controllers/
  ├── routes/
  ├── middleware/
  ├── db/
  └── app.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/works-mentor.git
cd works-mentor
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Run server:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

| Variable     | Description                  |
| ------------ | ---------------------------- |
| DATABASE_URL | PostgreSQL connection string |
| JWT_SECRET   | Secret key for JWT           |
| EMAIL_USER   | Email for sending OTP        |
| EMAIL_PASS   | Email app password / API key |

---

## 📸 Screenshots

* Landing Page
* Login & OTP Verification
* Dashboard (Product Cards)
* Product Details Page

*(Add screenshots here to boost portfolio impact)*

---

## 🚀 Future Improvements

* Pagination / Infinite scroll
* Product image upload
* Role-based access (Admin/User)
* Dark mode 🌙
* Analytics dashboard

---

## 🧠 Key Learnings

* Full-stack application architecture
* OTP-based authentication flow
* REST API design
* State management in React
* Building production-level UI/UX

---

## 👨‍💻 Author

**Ansh Sharma**
B.Tech CSE | Full Stack Developer

---

⭐ If you like this project, consider giving it a star!
