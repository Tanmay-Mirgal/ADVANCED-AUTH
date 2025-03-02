# 🔐 Advanced Authentication - MERN Stack

**Advanced Authentication** is a secure and robust authentication system built using the **MERN stack**. It includes features like user signup, login, password reset, and email verification using **Mailtrap** for email services.

---

## 🚀 Features

✅ **User Signup & Login** – Secure authentication with JWT.  
✅ **Password Reset** – Users can reset their passwords via email.  
✅ **Forgot Password** – Secure token-based password recovery.  
✅ **Email Verification** – Confirmation emails sent via **Mailtrap**.  
✅ **Role-based Authentication** – Define user roles for restricted access.  
✅ **MongoDB Integration** – Store user credentials securely.

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** – User interface and authentication pages.
- **Tailwind CSS** – For styling and responsiveness.
- **React Router** – For seamless navigation.

### Backend:
- **Node.js & Express.js** – API handling and authentication logic.
- **MongoDB & Mongoose** – Secure user data storage.
- **JWT (JSON Web Tokens)** – Authentication token system.
- **Bcrypt.js** – Password hashing for security.
- **Mailtrap** – Email service for verification and password reset.

---

## 📂 Project Structure

```
advanced-auth/
│── client/              # React frontend
│── server/              # Express.js backend
│── .env                 # Environment variables
│── package.json         # Dependencies & scripts
│── README.md            # Project documentation
```

---

## 📌 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Tanmay-Mirgal/Advanced-Auth.git
cd Advanced-Auth
```

### 2️⃣ Install Dependencies

#### Install frontend dependencies:
```sh
cd client
npm install
```

#### Install backend dependencies:
```sh
cd ../server
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the `server` folder and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
```

### 4️⃣ Start the Application

#### Start the backend:
```sh
cd server
npm start
```

#### Start the frontend:
```sh
cd client
npm start
```

The app will start running at `http://localhost:3000/`.

---

## 📜 License

This project is **open-source** and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository  
2. Create a new branch (`feature-name`)  
3. Commit your changes  
4. Push the branch and create a **Pull Request**  

---

## 📬 Connect with Me

[![GitHub](https://img.shields.io/badge/GitHub-TanmayMirgal-blue?style=flat&logo=github)](https://github.com/Tanmay-Mirgal)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-TanmayMirgal-blue?style=flat&logo=linkedin)](YOUR_LINKEDIN_URL)  
[![Twitter](https://img.shields.io/badge/Twitter-TanmayMirgal-blue?style=flat&logo=twitter)](YOUR_TWITTER_URL)  

---


