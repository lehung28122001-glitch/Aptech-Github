import { useParams, useNavigate, Link } from 'react-router-dom';
import sharedData from '../services/SharedData';

function BadgeDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm huy hiệu muốn xóa từ SharedData
  const targetBadge = sharedData.getBadgeById(id);

  if (!targetBadge) {
    return (
      <div className="empty-state" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <div className="empty-icon">⚠️</div>
        <h3>Không tìm thấy Huy hiệu</h3>
        <p className="empty-text">Huy hiệu bạn muốn xóa không tồn tại hoặc đã được xóa trước đó.</p>
        <Link to="/badges" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const handleDeleteConfirm = () => {
    sharedData.deleteBadge(targetBadge.id);
    navigate('/badges'); // Điều hướng về trang danh sách sau khi xóa thành công
  };

  return (
    <div className="delete-panel">
      <div className="page-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 className="page-title">Xác nhận Xóa</h1>
          <p className="page-subtitle">Hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ!</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '30px' }}>
        <div className="warning-icon">⚠️</div>
        
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px' }}>
          Bạn có chắc chắn muốn xóa huy hiệu này?
        </h2>
        
        <div className="delete-badge-preview">
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>
            {targetBadge.icon_url || '🏅'}
          </span>
          <h3 style={{ margin: 0, fontSize: '18px' }}>{targetBadge.name}</h3>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {targetBadge.description}
          </p>
          <span style={{ 
            display: 'inline-block', 
            marginTop: '12px', 
            fontSize: '11px', 
            textTransform: 'uppercase',
            fontWeight: '700',
            letterSpacing: '0.5px',
            color: 'var(--primary)',
            background: 'rgba(6, 182, 212, 0.1)',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}>
            Loại: {targetBadge.badge_type}
          </span>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Tất cả dữ liệu và lịch sử liên quan đến huy hiệu này sẽ bị loại bỏ vĩnh viễn khỏi bộ nhớ của bạn.
        </p>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ flex: 1 }}
            onClick={() => navigate('/badges')}
          >
            Hủy bỏ
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            style={{ flex: 1 }}
            onClick={handleDeleteConfirm}
          >
            🗑️ Xác nhận Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default BadgeDelete;
