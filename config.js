// Cấu hình sự kiện Bước Chân Xanh 2026 — FILE DUY NHẤT chứa số liệu sự kiện.
// PO/BA điền số liệu thật vào đây; các khối trong index.html đọc từ file này,
// không hardcode số liệu rải rác. Giá trị "[CHỜ XÁC NHẬN]" nghĩa là MSR-9
// chưa cung cấp số liệu đó — KHÔNG được tự bịa số thay thế.
const EVENT_CONFIG = {
  // Thời gian — S3
  eventDate: "[CHỜ XÁC NHẬN — ngày + giờ xuất phát]",
  // Địa điểm — S3
  eventLocation: "[CHỜ XÁC NHẬN — địa điểm tập trung/xuất phát]",
  // Phí đăng ký từng cự ly — S4
  fees: {
    "3km": "[CHỜ XÁC NHẬN — phí cự ly 3km]",
    "5km": "[CHỜ XÁC NHẬN — phí cự ly 5km]",
    "10km": "[CHỜ XÁC NHẬN — phí cự ly 10km]"
  },
  // Ghi chú quyền lợi chung dưới 3 thẻ cự ly — S4
  benefitsNote: "[CHỜ XÁC NHẬN — quyền lợi chung của vận động viên]",
  // Lộ trình từng cự ly — S5: MSR-9 chưa cung cấp tên
  // đường/điểm mốc — KHÔNG được tự bịa tên đường thay thế.
  route: {
    "3km": "[CHỜ XÁC NHẬN — điểm mốc lộ trình cự ly 3km: xuất phát → … → về đích]",
    "5km": "[CHỜ XÁC NHẬN — điểm mốc lộ trình cự ly 5km: xuất phát → … → về đích]",
    "10km": "[CHỜ XÁC NHẬN — điểm mốc lộ trình cự ly 10km: xuất phát → … → về đích]"
  },
  // Cơ cấu giải thưởng theo cự ly — S6: chưa xác nhận
  // giải, giá trị hay điều kiện nhận giải — KHÔNG ghi số tiền thưởng.
  prizes: {
    "3km": "[CHỜ XÁC NHẬN — cơ cấu giải thưởng cự ly 3km]",
    "5km": "[CHỜ XÁC NHẬN — cơ cấu giải thưởng cự ly 5km]",
    "10km": "[CHỜ XÁC NHẬN — cơ cấu giải thưởng cự ly 10km]"
  },
  // Nhà tài trợ — S8: chưa có tên/logo thật; khi PO cung cấp,
  // thay khung giữ chỗ này bằng lưới tên/logo thật, không dùng logo
  // thương hiệu thật nào làm ví dụ trước đó.
  sponsorsNote: "[CHỜ XÁC NHẬN — tên + logo nhà tài trợ]"
};
