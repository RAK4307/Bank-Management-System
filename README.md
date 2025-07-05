# 💳 Bank Management System

A full-stack Bank Management System built with **React**, **Node.js**, **Express**, and **MySQL**. This project enables users to manage their bank accounts digitally — allowing for account creation, secure transactions, and record-keeping — while also providing administrative functionalities for effective monitoring and control.


## ✨ Key Features

-  **User Authentication** — Secure login and registration functionality.

-  **Account Management** — Users can create and manage their bank accounts.

-  **Transactional Operations** — Supports deposits, withdrawals, and balance checks.

-  **Transaction History** — Users can view a complete log of their transactions.

-  **Admin Panel** — Admins can monitor all users and their activities.

-  **Responsive Interface** — Optimized for both desktop and mobile views.

-  **Environment Configuration** — Securely stores credentials via `.env`.


## 📁 Folder Structure:

The folder structure of the project is as follows:

    Bank-Management-System/
    ├── backend/        # Node + Express API
    ├── frontend/       # React App
    └── README.md


## 🛠️ Tech Stack

🔹 **Frontend**: React.js  

🔹 **Backend**: Node.js, Express.js

🔹 **Database**: MySQL  

🔹 **Other Tools**: dotenv, bcrypt


## 🚀 Installation & Setup


### 1. Clone the Repository


    git clone https://github.com/RAK4307/Bank-Management-System.git
    
    cd Bank-Management-System

### 2. Backend Setup (Node + Express)

    cd backend

    npm install
    
Create a ```.env``` file in the backend folder and add the following environment variables:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password    # Leave blank if your DB has no password
    DB_NAME=bank_management
    PORT=5000

Start the backend server:

    npm start

### 3. Frontend Setup (React)

    cd ../frontend
    npm install
    npm start

**Note :**  Ensure the frontend is pointing to the correct backend port (5000) for API calls.

### 4. MySQL Database Setup

Import the SQL file (e.g., ```bank_management.sql```) into your local MySQL server.

Ensure the database name matches the one in your .env (bank_management).

## 🔄 Project Workflow

### 👥 User Journey

1. **Register**:  
   A new user signs up with basic personal details and credentials.

2. **Login**:  
   Authenticated via secure login to access personal dashboard.

3. **Dashboard Access**:  
   User is greeted with their profile, account details, and available options.

4. **Account Creation** *(if not already created)*:  
   Create a new bank account with an initial deposit.

5. **Perform Transactions**:  
   - Deposit money into account
   - Withdraw money (if balance allows)
   - View real-time balance

6. **Transaction History**:  
   User can view a chronological list of all their deposits, withdrawals, and balance updates.

7. **Logout**:  
   User can securely logout from the system.

---

### 👨‍💼 Admin Journey

1. **Admin Login**:  
   Admin logs in using secure credentials.

2. **User Management**:  
   - View all registered users
   - View specific user details
   - Monitor account balances and transactions


## 🖼️ Screenshots
**Home Page :**

![Screenshot 2025-07-05 111223](https://github.com/user-attachments/assets/6804269d-395e-4b68-92c2-524e7671f729)
![Screenshot 2025-07-05 111252](https://github.com/user-attachments/assets/903762fe-792a-4a4e-801a-eb46a9b2a7e5)
![Screenshot 2025-07-05 111320](https://github.com/user-attachments/assets/91c77a06-c2d7-444c-abd3-29e659b05705)
![Screenshot 2025-07-05 111344](https://github.com/user-attachments/assets/72d45f6e-1b84-43be-90f0-ba6626fe4d17)

**Signup Page :**

![Screenshot 2025-07-05 111743](https://github.com/user-attachments/assets/338d6049-4076-450a-b4ff-da8e2913e478)

**Login Page :**

![Screenshot 2025-07-05 111535](https://github.com/user-attachments/assets/3cf6f1f5-4c5f-4943-892f-10d2c957d611)

**User Dashboard :**

![Screenshot 2025-07-05 111637](https://github.com/user-attachments/assets/8503b27b-7aa5-44d3-9573-ab6c58c10347)
![Screenshot 2025-07-05 111652](https://github.com/user-attachments/assets/44a7887d-c79a-4ed3-9d47-fe386dbd438f)
![Screenshot 2025-07-05 112247](https://github.com/user-attachments/assets/fb5020ab-b769-45f9-9f99-6d194a09dc88)
![Screenshot 2025-07-05 111724](https://github.com/user-attachments/assets/3eeea1e5-a46c-4dd7-9ff1-5abd06c22b87)
![Screenshot 2025-07-05 111712](https://github.com/user-attachments/assets/de0fa39d-742e-4ef6-aa8e-6a459e84cc58)

**Admin Login :**

![Screenshot 2025-07-05 111753](https://github.com/user-attachments/assets/bd9ed7ae-c777-465e-94d3-9ce737eee6ca)

**Admin Dashboard :**

![Screenshot 2025-07-05 111809](https://github.com/user-attachments/assets/a5ffdc82-d583-40e0-8e56-c8478257d4f9)


##  Future Enhancements

▪️ PDF export for transaction statements

▪️ Improved mobile responsiveness

▪️ Email alerts on transactions

▪️ Admin analytics dashboard

## 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository and submit a pull request for review.

## 📄 License

This project is licensed under the ```MIT License```.

### **Thank you for visiting!**



