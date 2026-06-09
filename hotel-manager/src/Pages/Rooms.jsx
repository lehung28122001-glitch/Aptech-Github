import RoomCard from "../components/Roomcard";

function Rooms({ rooms }) {
  return (
    <div className="container">
      <h1 className="page-title">Danh sách phòng</h1>

      <div className="room-grid">
        {rooms.map((r) => (
          <RoomCard key={r.id} room={r} />
        ))}
      </div>
    </div>
  );
}

export default Rooms;