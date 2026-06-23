# Hướng Dẫn Phát Triển - Chi Tiêu App

## 🚀 Cài Đặt Môi Trường

### Backend (Python)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
# hoặc
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

Chạy server:
```bash
python app.py
```
Server sẽ chạy tại: `http://localhost:5000`

### Web (React + Vite)

```bash
cd web
npm install
npm run dev
```
Truy cập tại: `http://localhost:3000`

### Mobile (React Native + Expo)

```bash
cd mobile
npm install
npm start
```
Quét QR code với Expo app trên điện thoại hoặc nhấn `i` (iOS) / `a` (Android)

### Desktop (Electron)

```bash
# Build web app first
cd web
npm run build

# Setup desktop
cd ../desktop
npm install
npm start
```

## 📊 Cấu Trúc Dữ Liệu

### Transaction Object
```json
{
  "id": 1,
  "type": "income" | "expense",
  "category": "salary" | "allowance" | "bonus" | "rent" | "food" | "utilities" | "living" | "travel" | "social",
  "amount": 1000000,
  "date": "2024-01-15",
  "description": "Lương tháng 1",
  "created_at": "2024-01-15T10:30:00"
}
```

## 🔌 API Endpoints

### GET /api/health
Health check

### GET /api/categories
Lấy danh sách loại thu/chi

### GET /api/transactions
Lấy tất cả giao dịch

### POST /api/transactions
Tạo giao dịch mới
```json
{
  "type": "income",
  "category": "salary",
  "amount": 1000000,
  "date": "2024-01-15",
  "description": "Ghi chú"
}
```

### GET /api/transactions/:id
Lấy chi tiết giao dịch

### PUT /api/transactions/:id
Cập nhật giao dịch

### DELETE /api/transactions/:id
Xóa giao dịch

### GET /api/summary
Lấy tóm tắt thu/chi

## 🗄️ Database (Tương Lai)

### Firebase Firestore (Recommended)
- Cloud database
- Real-time sync
- Authentication
- Offline support

### SQLite (Local)
- Lưu trữ local
- Không cần server
- Đơn giản nhưng giới hạn

## 📝 Quy Trình Phát Triển

1. **Feature Branch**
   ```bash
   git checkout -b feature/tên-feature
   ```

2. **Code & Test**
   ```bash
   npm test
   ```

3. **Commit**
   ```bash
   git commit -m "feat: mô tả tính năng"
   ```

4. **Push & PR**
   ```bash
   git push origin feature/tên-feature
   ```

## 🔐 Environment Variables

Tạo file `.env` trong backend/:
```env
FLASK_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Firebase (nếu dùng)
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
```

## 🐛 Troubleshooting

### CORS Error
- Đảm bảo backend server đang chạy
- Kiểm tra CORS settings trong `app.py`

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000  # Windows
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```
