# 💰 Chi Tiêu App - Expense Management System

Một ứng dụng quản lý chi tiêu toàn diện, chạy trên web, mobile, và desktop.

## 🎯 Tính Năng Chính

### Thu (Income)
- 💵 Lương
- 📈 Phụ cấp
- 🎁 Thưởng

### Chi (Expense)
- 🏠 Tiền nhà
- 🍽️ Tiền ăn
- 💡 Tiền điện nước
- 📋 Phí sinh hoạt
- ✈️ Tiền du lịch
- 🎯 Tiền giao lưu

## 🛠️ Tech Stack

### Frontend
- **Web**: React + Vite
- **Mobile**: React Native + Expo
- **Desktop**: Electron + React

### Backend
- **API**: Python Flask/FastAPI
- **Database**: Firebase Firestore (Cloud) hoặc SQLite (Local)
- **Authentication**: JWT + Firebase Auth

## 📁 Cấu Trúc Project

```
chi-tieu-app/
├── backend/                 # Python Backend
│   ├── app.py
│   ├── requirements.txt
│   ├── models/
│   ├── routes/
│   └── config.py
├── web/                     # React Web App
│   ├── src/
│   ├── public/
│   └── package.json
├── mobile/                  # React Native
│   ├── app.json
│   ├── src/
│   └── package.json
├── desktop/                 # Electron
│   ├── main.js
│   ├── src/
│   └── package.json
└── shared/                  # Shared utils & types
```

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Web Setup
```bash
cd web
npm install
npm run dev
```

### Mobile Setup
```bash
cd mobile
npm install
npm start
```

### Desktop Setup
```bash
cd desktop
npm install
npm start
```

## 📝 License

MIT