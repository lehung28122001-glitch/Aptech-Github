# Hotel Manager - Ứng dụng Quản lý Khách sạn đơn giản

Ứng dụng Web Single Page Application (SPA) đơn giản được xây dựng bằng **React** và **Vite** nhằm hỗ trợ việc xem danh sách phòng, thực hiện đặt phòng và theo dõi danh sách khách hàng.

---

## 📌 Tính năng chính

1. **Trang chủ (Home):** Trang giới thiệu chung về khách sạn với hình ảnh trực quan.
2. **Danh sách phòng (Rooms):** 
   - Hiển thị danh sách các loại phòng (Phòng VIP, Phòng Deluxe, Phòng Standard).
   - Hiển thị trạng thái phòng (Còn trống / Đã đặt) kèm giá phòng chi tiết.
   - Nút đặt phòng nhanh dẫn trực tiếp đến trang Đặt phòng.
3. **Đặt phòng (Booking):**
   - Form nhập thông tin khách hàng (Họ tên, Số điện thoại, Ngày nhận phòng).
   - Lựa chọn phòng trống (các phòng đã đặt sẽ bị vô hiệu hóa trong danh sách chọn).
   - Kiểm tra và xác nhận đặt phòng thành công.
4. **Quản lý khách hàng (Customers):**
   - Bảng danh sách hiển thị các khách hàng đã đặt phòng thành công.
   - Hiển thị các thông tin chi tiết: số thứ tự, tên, số điện thoại, phòng đã đặt và ngày nhận phòng.

---

## 🛠️ Công nghệ sử dụng

- **Thư viện chính:** [React 19](https://react.dev/)
- **Định tuyến (Routing):** [React Router Dom v7](https://reactrouter.com/)
- **Công cụ xây dựng (Build Tool):** [Vite](https://vite.dev/)
- **Giao diện (Styling):** Vanilla CSS (`src/index.css`, `src/App.css`)

---

## 📂 Cấu trúc thư mục dự án

```text
hotel-manager/
├── public/              # Thư mục chứa tài nguyên tĩnh công cộng
├── src/
│   ├── assets/          # Hình ảnh, icon tĩnh
│   ├── components/      # Các thành phần giao diện tái sử dụng
│   │   ├── Navbar.jsx   # Thanh điều hướng (Trang chủ, Phòng, Đặt phòng, Khách hàng)
│   │   └── Roomcard.jsx # Thẻ hiển thị thông tin từng phòng
│   ├── Pages/           # Các trang/view của ứng dụng
│   │   ├── Home.jsx      # Giao diện Trang chủ
│   │   ├── Rooms.jsx     # Danh sách các phòng khách sạn
│   │   ├── Booking.jsx   # Form đăng ký đặt phòng
│   │   └── Customers.jsx # Bảng danh sách khách hàng đã đặt
│   ├── App.css          # CSS riêng của ứng dụng
│   ├── App.jsx          # Component gốc: Quản lý Router và State (danh sách khách hàng, thông tin phòng)
│   ├── index.css        # CSS phong cách chung
│   └── main.jsx         # Điểm khởi đầu của ứng dụng React
├── package.json         # Danh sách thư viện phụ thuộc và scripts chạy dự án
└── vite.config.js       # File cấu hình Vite
```

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

Để chạy dự án ở môi trường cục bộ (local), vui lòng thực hiện theo các bước sau:

### 1. Cài đặt các thư viện cần thiết

Trước hết, bạn cần cài đặt các dependency thông qua npm:

```bash
npm install
```

### 2. Khởi chạy Server phát triển (Development Mode)

Chạy lệnh sau để khởi động ứng dụng trên local server:

```bash
npm run dev
```

Sau khi chạy lệnh, truy cập vào đường dẫn mặc định (thường là `http://localhost:5173`) hiển thị trên terminal để xem và tương tác với giao diện.

### 3. Build sản phẩm (Production Mode)

Để đóng gói ứng dụng tối ưu phục vụ cho việc deploy:

```bash
npm run build
```

---

*Dự án này được tạo và thiết kế nhằm phục vụ cho mục đích thực hành xây dựng ứng dụng SPA với React và React Router.*
