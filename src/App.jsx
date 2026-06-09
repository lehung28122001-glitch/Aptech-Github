import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BadgeList from './pages/BadgeList';
import BadgeAdd from './pages/BadgeAdd';
import BadgeEdit from './pages/BadgeEdit';
import BadgeDelete from './pages/BadgeDelete';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Thanh điều hướng dùng chung cho toàn ứng dụng */}
      <Navbar />

      {/* Định nghĩa các Route ảo của trang */}
      <main className="main-content">
        <Routes>
          {/* Mặc định tự chuyển hướng từ trang chủ "/" sang "/badges" */}
          <Route path="/" element={<Navigate to="/badges" replace />} />
          
          {/* Tuyến đường chính hiển thị danh sách */}
          <Route path="/badges" element={<BadgeList />} />
          
          {/* Tuyến đường thêm mới huy hiệu */}
          <Route path="/badges/add" element={<BadgeAdd />} />
          
          {/* Tuyến đường sửa đổi huy hiệu (Dynamic Route chứa tham số :id) */}
          <Route path="/badges/edit/:id" element={<BadgeEdit />} />
          
          {/* Tuyến đường xác nhận xóa huy hiệu (Dynamic Route chứa tham số :id) */}
          <Route path="/badges/delete/:id" element={<BadgeDelete />} />
          
          {/* Tự động điều hướng về /badges nếu nhập sai URL */}
          <Route path="*" element={<Navigate to="/badges" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

