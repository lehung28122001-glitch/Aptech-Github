import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/home" className="nav-link">
        Trang chủ
      </Link>

      <Link to="/rooms" className="nav-link">
        Danh sách phòng
      </Link>

      <Link to="/booking" className="nav-link">
        Đặt phòng
      </Link>

      <Link to="/customers" className="nav-link">
        Khách hàng
      </Link>

      {onLogout && (
        <button type="button" className="nav-link nav-button" onClick={onLogout}>
          Đăng xuất
        </button>
      )}
    </nav>
  );
}

export default Navbar;
