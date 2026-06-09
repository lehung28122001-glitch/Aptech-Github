class SharedData {
  constructor() {
    this.listeners = [];
    this.badges = this.loadFromStorage();

    // Nếu localStorage trống hoặc danh sách rỗng, gọi API nạp dữ liệu mẫu ban đầu
    if (this.badges.length === 0) {
      this.fetchInitialData();
    }
  }

  // Tải dữ liệu từ localStorage
  loadFromStorage() {
    const saved = localStorage.getItem('badges');
    return saved ? JSON.parse(saved) : [];
  }

  // Lưu dữ liệu vào localStorage và thông báo thay đổi tới các component đang lắng nghe
  saveToStorage() {
    localStorage.setItem('badges', JSON.stringify(this.badges));
    this.notify();
  }

  // Gọi API lấy dữ liệu mẫu ban đầu từ github
  async fetchInitialData() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/tranvandiep/tranvandiep/refs/heads/main/badges.json');
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu từ API');
      }
      const data = await response.json();
      // Lọc bỏ huy hiệu bị đánh dấu xóa (deleted === 1)
      const activeBadges = data.filter(badge => badge.deleted !== 1);
      
      // Gán id số nguyên rõ ràng và chuẩn hóa cấu trúc
      this.badges = activeBadges.map((badge, idx) => ({
        id: badge.id ? Number(badge.id) : idx + 1,
        name: badge.name || 'Huy hiệu mới',
        description: badge.description || 'Mô tả huy hiệu',
        icon_url: badge.icon_url || '🏅',
        badge_type: (badge.badge_type || 'match').toLowerCase(),
        created_at: badge.created_at || new Date().toISOString(),
        updated_at: badge.updated_at || new Date().toISOString()
      }));
      
      this.saveToStorage();
    } catch (error) {
      console.error('Lỗi khi nạp dữ liệu mẫu ban đầu từ API:', error);
      // Dữ liệu mặc định dự phòng cực đẹp mắt nếu mất kết nối
      this.badges = [
        {
          id: 1,
          name: 'Thành viên Mới',
          description: 'Huy hiệu dành cho tài khoản đăng ký thành công lần đầu!',
          icon_url: '🌱',
          badge_type: 'achievement',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Cao Thủ Tranh Đấu',
          description: 'Tham gia thi đấu 10 trận đấu liên tiếp trong tuần.',
          icon_url: '⚔️',
          badge_type: 'match',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Người Đi Xuyên Lục Địa',
          description: 'Hoàn thành nhiệm vụ ở 3 quốc gia khác nhau.',
          icon_url: '✈️',
          badge_type: 'country',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      this.saveToStorage();
    }
  }

  // Đăng ký nhận thông báo thay đổi (Design Pattern: Observer / Pub-Sub)
  subscribe(listener) {
    this.listeners.push(listener);
    // Trả về hàm hủy đăng ký (unsubscribe) để gọi khi component bị dọn dẹp (unmount)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Thông báo sự thay đổi dữ liệu đến tất cả các subscriber
  notify() {
    this.listeners.forEach(listener => listener([...this.badges]));
  }

  // Trả về bản sao của mảng dữ liệu hiện tại
  getBadges() {
    return [...this.badges];
  }

  // Tìm huy hiệu theo ID duy nhất
  getBadgeById(id) {
    return this.badges.find(badge => badge.id === Number(id));
  }

  // Thêm mới một huy hiệu
  addBadge(newBadge) {
    const badgeWithId = {
      ...newBadge,
      id: newBadge.id ? Number(newBadge.id) : Date.now(),
      created_at: newBadge.created_at || new Date().toISOString(),
      updated_at: newBadge.updated_at || new Date().toISOString()
    };
    this.badges = [...this.badges, badgeWithId];
    this.saveToStorage();
  }

  // Cập nhật thông tin huy hiệu sẵn có
  updateBadge(updatedBadge) {
    this.badges = this.badges.map(badge => 
      badge.id === Number(updatedBadge.id) 
        ? { ...badge, ...updatedBadge, updated_at: new Date().toISOString() } 
        : badge
    );
    this.saveToStorage();
  }

  // Xóa huy hiệu khỏi hệ thống
  deleteBadge(id) {
    this.badges = this.badges.filter(badge => badge.id !== Number(id));
    this.saveToStorage();
  }
}

// Xuất một thực thể duy nhất dùng chung cho toàn bộ dự án (Singleton Pattern)
const sharedDataInstance = new SharedData();
export default sharedDataInstance;
