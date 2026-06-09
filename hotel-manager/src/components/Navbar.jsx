import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
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
    </nav>
  );
}

export default Navbar;