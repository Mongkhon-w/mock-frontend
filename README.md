#  🚀 Finance Management System (Full-Stack)
แอปพลิเคชันจัดการธุรกรรมทางการเงิน พัฒนาด้วยเทคโนโลยีสมัยใหม่ รองรับการสมัครสมาชิกและจัดการข้อมูลส่วนตัว

## 🛠 Tech Stack
* Database: MySQL / MariaDB
* Frontend: React, Vite, React Router, Context API
* Backend: Node.js, Express, Prisma (v7), Bcrypt

## 🛠️ Required Tools
* **Runtime/Environment:** Node.js
* **Build Tool:** Vite
* **Frontend Framework:** React.js
* **Routing:** React Router DOM
* **State Management:** Context API (Built-in)
* **Icons:** React Icons
* **Editor:** VS Code


## 🏗️ Development Setup
### Initialize Project (First time)
```bash
# 1. สร้างโปรเจกต์ React ด้วย Vite (ตั้งชื่อว่า my-react-template)
npm create vite@latest my-react-template -- --template react
# 2. เข้าไปในโฟลเดอร์ที่เพิ่งสร้าง
cd my-react-template
# 3. ติดตั้ง Dependencies พื้นฐานของ React
npm install
# 4. ติดตั้งแพ็กเกจเสริมที่เราใช้งาน (React Router สำหรับระบบเปลี่ยนหน้า และ React Icons สำหรับไอคอนถังขยะ)
npm install react-router-dom react-icons
```

### Create Folder Structure 
```bash
# 1. เข้าไปในโฟลเดอร์ src
cd src

# 2. สร้างโฟลเดอร์ทั้งหมด 8 โฟลเดอร์รวดเดียว
mkdir assets components context hooks layouts pages services utils

# ลบไฟล์ CSS เก่าที่ไม่ใช้
rm App.css

# สร้างไฟล์ Component & Context
touch components/Card.jsx
touch components/ProtectedRoute.jsx
touch context/AppContext.jsx

# สร้างไฟล์ Hook & Service
touch hooks/useTransactions.js
touch services/apiService.js
touch services/authService.js
touch services/transactionService.js
touch utils/exportUtils.js

# สร้างไฟล์ Layout
touch layouts/MainLayout.jsx
touch layouts/Layout.css

# สร้างไฟล์ Pages
touch pages/Dashboard.jsx
touch pages/Home.jsx
touch pages/Login.jsx
touch pages/Register.jsx
touch pages/Settings.jsx
```


## 🏃‍♂️ Running the System
```bash
# ถอยกลับมาที่โฟลเดอร์หลักของโปรเจกต์ (ถ้ายังอยู่ใน src)
cd ..

# รันเซิร์ฟเวอร์
npm run dev
```