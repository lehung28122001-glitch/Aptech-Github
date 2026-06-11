import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./Pages/Home";
import Rooms from "./Pages/Rooms";
import Booking from "./Pages/Booking";
import Customers from "./Pages/Customers";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  const [customers, setCustomers] = useState([]);
  const [vipUser, setVipUser] = useState(null);
  const [accounts, setAccounts] = useState([
    { name: "Gilded VIP", email: "vip@hotel.com", password: "gold1234" },
  ]);

  const rooms = [
    {
      id: 1,
      name: "Phòng VIP",
      price: 1000000,
      status: "Còn trống",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      id: 2,
      name: "Phòng Deluxe",
      price: 800000,
      status: "Đã đặt",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
    {
      id: 3,
      name: "Phòng Standard",
      price: 500000,
      status: "Còn trống",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  ];

  const handleLogin = ({ email, password }) => {
    const user = accounts.find(
      (account) =>
        account.email.toLowerCase() === email.toLowerCase() &&
        account.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Email hoặc mật khẩu VIP không chính xác.",
      };
    }

    setVipUser(user);
    return { success: true };
  };

  const handleSignup = ({ name, email, password, code }) => {
    if (!name || !email || !password || !code) {
      return { success: false, message: "Vui lòng nhập đầy đủ thông tin." };
    }

    const normalizedEmail = email.toLowerCase();
    if (accounts.some((account) => account.email === normalizedEmail)) {
      return { success: false, message: "Email này đã được đăng ký VIP." };
    }

    const validCodes = ["VIPGOLD", "GILDEDGOLD", "GOLDVIP"];
    if (!validCodes.includes(code.toUpperCase().trim())) {
      return {
        success: false,
        message: "Mã VIP không hợp lệ. Vui lòng sử dụng mã GILDEDGOLD.",
      };
    }

    const newAccount = {
      name,
      email: normalizedEmail,
      password,
    };

    setAccounts([...accounts, newAccount]);
    setVipUser(newAccount);
    return { success: true };
  };

  const handleLogout = () => {
    setVipUser(null);
  };

  const protect = (element) =>
    vipUser ? element : <Navigate to="/login" replace />;

  return (
    <BrowserRouter>
      {vipUser && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            vipUser ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/login"
          element={
            vipUser ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            vipUser ? <Navigate to="/home" replace /> : <Signup onSignup={handleSignup} />
          }
        />
        <Route path="/home" element={protect(<Home />)} />
        <Route path="/rooms" element={protect(<Rooms rooms={rooms} />)} />
        <Route
          path="/booking"
          element={protect(
            <Booking rooms={rooms} customers={customers} setCustomers={setCustomers} />
          )}
        />
        <Route path="/customers" element={protect(<Customers customers={customers} />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
