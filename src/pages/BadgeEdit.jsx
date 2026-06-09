import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import sharedData from '../services/SharedData';

function BadgeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Tìm kiếm huy hiệu từ SharedData
  const existingBadge = sharedData.getBadgeById(id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('🏅');
  const [badgeType, setBadgeType] = useState('match');
  const [customBadgeType, setCustomBadgeType] = useState('');
  const [isCustomType, setIsCustomType] = useState(false);
  const [error, setError] = useState('');

  // Cập nhật giá trị ban đầu vào form khi tìm thấy huy hiệu
  useEffect(() => {
    if (existingBadge) {
      setName(existingBadge.name);
      setDescription(existingBadge.description);
      setIconUrl(existingBadge.icon_url || '🏅');
      
      const standardTypes = ['match', 'country', 'special', 'achievement'];
      const type = existingBadge.badge_type.toLowerCase();
      if (standardTypes.includes(type)) {
        setBadgeType(type);
        setIsCustomType(false);
      } else {
        setCustomBadgeType(existingBadge.badge_type);
        setIsCustomType(true);
      }
    }
  }, [existingBadge]);

  const popularEmojis = ['🏅', '🥇', '👑', '⭐️', '🔥', '🥁', '🌍', '⚡️', '🚀', '🏆', '💎', '🎮', '💡', '🛡️', '❤️'];

  if (!existingBadge) {
    return (
      <div className="empty-state" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <div className="empty-icon">⚠️</div>
        <h3>Không tìm thấy Huy hiệu</h3>
        <p className="empty-text">Huy hiệu có ID "{id}" không tồn tại hoặc đã bị xóa trước đó.</p>
        <Link to="/badges" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Vui lòng nhập tên huy hiệu!');
      return;
    }
    if (!description.trim()) {
      setError('Vui lòng nhập mô tả huy hiệu!');
      return;
    }

    const type = isCustomType ? customBadgeType.trim() : badgeType;
    if (!type) {
      setError('Vui lòng chọn hoặc nhập phân loại huy hiệu!');
      return;
    }

    // Đối tượng đã chỉnh sửa (vẫn giữ nguyên id và ngày tạo ban đầu)
    const updatedBadge = {
      id: existingBadge.id,
      name: name.trim(),
      description: description.trim(),
      icon_url: iconUrl,
      badge_type: type.toLowerCase(),
      created_at: existingBadge.created_at,
      updated_at: new Date().toISOString() // Cập nhật thời gian chỉnh sửa mới nhất
    };

    sharedData.updateBadge(updatedBadge);
    navigate('/badges'); // Quay lại trang danh sách
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Chỉnh sửa Huy hiệu</h1>
          <p className="page-subtitle">Cập nhật thông tin chi tiết và lưu thay đổi</p>
        </div>
      </div>

      <div className="glass-panel">
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.4)', 
              color: '#ef4444', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              textAlign: 'left',
              fontSize: '14px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="badge-name">Tên huy hiệu *</label>
            <input
              id="badge-name"
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="badge-desc">Mô tả chi tiết *</label>
            <textarea
              id="badge-desc"
              className="input-field textarea-field"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Chọn Biểu tượng (Emoji) *</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                className="input-field"
                style={{ width: '70px', textAlign: 'center', fontSize: '20px' }}
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Hoặc chọn nhanh bên dưới:
              </span>
            </div>
            
            <div className="emoji-selector">
              {popularEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`emoji-btn ${iconUrl === emoji ? 'selected' : ''}`}
                  onClick={() => setIconUrl(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phân loại huy hiệu *</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: isCustomType ? '12px' : '0' }}>
              <button
                type="button"
                className={`btn ${!isCustomType ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '10px' }}
                onClick={() => setIsCustomType(false)}
              >
                Chọn có sẵn
              </button>
              <button
                type="button"
                className={`btn ${isCustomType ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '10px' }}
                onClick={() => setIsCustomType(true)}
              >
                Nhập tùy chỉnh
              </button>
            </div>

            {!isCustomType ? (
              <select
                className="select-field"
                style={{ width: '100%' }}
                value={badgeType}
                onChange={(e) => setBadgeType(e.target.value)}
              >
                <option value="match">Match</option>
                <option value="country">Country</option>
                <option value="special">Special</option>
                <option value="achievement">Achievement</option>
              </select>
            ) : (
              <input
                type="text"
                className="input-field"
                value={customBadgeType}
                onChange={(e) => {
                  setCustomBadgeType(e.target.value);
                  setError('');
                }}
              />
            )}
          </div>

          <div className="form-actions">
            <Link to="/badges" className="btn btn-secondary">
              Hủy bỏ
            </Link>
            <button type="submit" className="btn btn-primary">
              💾 Cập nhật Thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BadgeEdit;
