import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onSignup({ name, email, password, code });

    if (result.success) {
      navigate("/home");
      return;
    }

    setError(result.message || "Đăng ký thất bại. Vui lòng thử lại.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-badge">VIP Signup</span>
        <h1 className="auth-title">Đăng ký VIP Buyer</h1>
        <p className="auth-subtitle">
          Tạo tài khoản VIP với mã truy cập riêng để truy cập phòng Gilded Gold.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="vip-name">Họ và tên</label>
          <input
            id="vip-name"
            type="text"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn VIP"
          />

          <label htmlFor="vip-email">VIP Email</label>
          <input
            id="vip-email"
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vip@hotel.com"
          />

          <label htmlFor="vip-password">VIP Password</label>
          <input
            id="vip-password"
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          <label htmlFor="vip-code">VIP Access Code</label>
          <input
            id="vip-code"
            type="text"
            className="auth-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="GILDEDGOLD"
          />

          <button type="submit" className="auth-button">
            Tạo tài khoản VIP
          </button>
        </form>

        <div className="auth-footer">
          <span>Đã có tài khoản VIP?</span>
          <Link to="/login" className="auth-link">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
