import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./Pages/Home";
import Rooms from "./Pages/Rooms";
import Booking from "./Pages/Booking";
import Customers from "./Pages/Customers";

function App() {
  const [customers, setCustomers] = useState([]);

  const rooms = [
    {
      id: 1,
      name: "Phòng VIP",
      price: 1000000,
      status: "Còn trống",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      id: 2,
      name: "Phòng Deluxe",
      price: 800000,
      status: "Đã đặt",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
    {
      id: 3,
      name: "Phòng Standard",
      price: 500000,
      status: "Còn trống",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  ];

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/rooms" element={<Rooms rooms={rooms} />} />

        <Route
          path="/booking"
          element={
            <Booking
              rooms={rooms}
              customers={customers}
              setCustomers={setCustomers}
            />
          }
        />

        <Route
          path="/customers"
          element={<Customers customers={customers} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;