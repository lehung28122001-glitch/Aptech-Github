import { useState } from "react";

function Booking({ rooms, customers, setCustomers }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !room || !date) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name,
      phone,
      room,
      date,
    };

    setCustomers([...customers, newCustomer]);

    alert("Đặt phòng thành công!");

    setName("");
    setPhone("");
    setRoom("");
    setDate("");
  };

  return (
    <div className="container">
      <h1 className="page-title">Đặt phòng</h1>

      <div className="booking-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Họ tên:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại:</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Chọn phòng:</label>
            <select 
              className="form-control"
              value={room} 
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value="">-- Chọn phòng --</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.name} disabled={r.status !== "Còn trống"}>
                  {r.name} - {r.price.toLocaleString("vi-VN")} VNĐ {r.status !== "Còn trống" ? "(Đã đặt)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Ngày nhận phòng:</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Xác nhận đặt phòng
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;