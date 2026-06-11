import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin({ email, password });

    if (result.success) {
      navigate("/home");
      return;
    }

    setError(result.message || "Đăng nhập thất bại. Vui lòng thử lại.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-badge">Gilded VIP</span>
        <h1 className="auth-title">VIP Buyer Login</h1>
        <p className="auth-subtitle">
          Chỉ dành cho khách hàng VIP. Đăng nhập để truy cập đặt phòng cao cấp.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="auth-button">
            Đăng nhập VIP
          </button>
        </form>

        <div className="auth-footer">
          <span>Chưa có tài khoản VIP?</span>
          <Link to="/signup" className="auth-link">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
