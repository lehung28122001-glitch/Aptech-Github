import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/badges" className="nav-brand">
        <span className="nav-logo">🛡️</span>
        <span className="nav-title">BadgeMaster</span>
      </NavLink>
      <div className="nav-links">
        <NavLink 
          to="/badges" 
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Danh sách
        </NavLink>
        <NavLink 
          to="/badges/add" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Thêm mới
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
