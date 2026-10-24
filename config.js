// Cấu hình sự kiện Bước Chân Xanh 2026 — FILE DUY NHẤT chứa số liệu sự kiện.
// PO/BA điền số liệu thật vào đây; các khối trong index.html đọc từ file này,
// không hardcode số liệu rải rác. Giá trị "[CHỜ XÁC NHẬN]" nghĩa là MSR-9/TEC-59
// chưa cung cấp số liệu đó — KHÔNG được tự bịa số thay thế.
const EVENT_CONFIG = {
  // Thời gian — S3 (TEC-61)
  eventDate: "[CHỜ XÁC NHẬN — ngày + giờ xuất phát]",
  // Địa điểm — S3 (TEC-61)
  eventLocation: "[CHỜ XÁC NHẬN — địa điểm tập trung/xuất phát]",
  // Phí đăng ký từng cự ly — S4 (TEC-61)
  fees: {
    "3km": "[CHỜ XÁC NHẬN — phí cự ly 3km]",
    "5km": "[CHỜ XÁC NHẬN — phí cự ly 5km]",
    "10km": "[CHỜ XÁC NHẬN — phí cự ly 10km]"
  },
  // Ghi chú quyền lợi chung dưới 3 thẻ cự ly — S4 (TEC-61)
  benefitsNote: "[CHỜ XÁC NHẬN — quyền lợi chung của vận động viên]"
};
