import { Link } from "react-router-dom";

function RoomCard(props) {
  const isAvailable = props.room.status === "Còn trống";

  return (
    <div className="room-card">
      <div className="room-image-wrapper">
        <img
          src={props.room.image}
          alt={props.room.name}
          className="room-image"
        />
        <span className={`room-status ${isAvailable ? 'available' : 'booked'}`}>
          {props.room.status}
        </span>
      </div>
      
      <div className="room-content">
        <h3 className="room-title">{props.room.name}</h3>
        <p className="room-price">
          {props.room.price.toLocaleString("vi-VN")} <span>VNĐ / Đêm</span>
        </p>
        <Link to="/booking" className="btn btn-primary" style={{ marginTop: 'auto' }}>
          Đặt ngay
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;