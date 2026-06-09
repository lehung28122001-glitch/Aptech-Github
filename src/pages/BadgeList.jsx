import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sharedData from '../services/SharedData';

function BadgeList() {
  const [badges, setBadges] = useState(() => sharedData.getBadges());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Đăng ký nhận thay đổi từ SharedData sử dụng useEffect
  useEffect(() => {
    // Tải dữ liệu hiện tại ngay khi mount
    setBadges(sharedData.getBadges());

    // Đăng ký lắng nghe các thay đổi tiếp theo
    const unsubscribe = sharedData.subscribe((updatedList) => {
      setBadges(updatedList);
    });

    // Cleanup khi component bị hủy
    return () => unsubscribe();
  }, []);

  // Lọc danh sách dựa trên từ khóa tìm kiếm và phân loại
  const filteredBadges = badges.filter((badge) => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || badge.badge_type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Định dạng ngày hiển thị đẹp hơn
  const formatDate = (isoString) => {
    if (!isoString) return 'Chưa cập nhật';
    try {
      const date = new Date(isoString);
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  // Trích xuất các loại huy hiệu duy nhất để hiển thị trong select
  const badgeTypes = ['all', ...new Set(badges.map(b => b.badge_type.toLowerCase()))];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Danh sách Huy hiệu</h1>
          <p className="page-subtitle">Quản lý và theo dõi tất cả các danh hiệu trong hệ thống</p>
        </div>
        <Link to="/badges/add" className="btn btn-primary">
          <span>➕</span> Thêm Huy hiệu
        </Link>
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="controls-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="🔍 Tìm kiếm huy hiệu theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select-field"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {badgeTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'Tất cả phân loại' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Lưới hiển thị các thẻ huy hiệu */}
      {filteredBadges.length > 0 ? (
        <div className="badges-grid">
          {filteredBadges.map((badge) => (
            <div 
              key={badge.id} 
              className={`badge-card ${badge.badge_type.toLowerCase() === 'match' ? 'match' : badge.badge_type.toLowerCase() === 'country' ? 'country' : ''}`}
            >
              <div className="badge-type-tag">{badge.badge_type}</div>
              
              <div className="badge-avatar">
                {badge.icon_url || '🏅'}
              </div>
              
              <h3 className="badge-name">{badge.name}</h3>
              <p className="badge-desc">{badge.description}</p>
              
              <div className="badge-dates">
                <div className="badge-dates-row">
                  <span>📅 Ngày tạo:</span>
                  <span>{formatDate(badge.created_at)}</span>
                </div>
                <div className="badge-dates-row">
                  <span>🔄 Cập nhật:</span>
                  <span>{formatDate(badge.updated_at)}</span>
                </div>
              </div>

              <div className="badge-actions">
                <Link to={`/badges/edit/${badge.id}`} className="btn btn-secondary">
                  <span>✏️</span> Sửa
                </Link>
                <Link to={`/badges/delete/${badge.id}`} className="btn btn-danger">
                  <span>❌</span> Xóa
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Không tìm thấy huy hiệu nào</h3>
          <p className="empty-text">Thử thay đổi từ khóa tìm kiếm hoặc phân loại để tìm kiếm.</p>
        </div>
      )}
    </div>
  );
}

export default BadgeList;
