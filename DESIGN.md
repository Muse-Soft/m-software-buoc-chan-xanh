# DESIGN.md — Landing page Bước Chân Xanh 2026

> Task thiết kế: TEC-60 · Epic: TEC-59 "[Epic] Sprint 1 — Trang sự kiện chạy bộ Bước Chân Xanh 2026"
> Nguồn yêu cầu: MSR-9 (giải chạy từ thiện gây quỹ trồng cây)
> Repo: https://github.com/Muse-Soft/m-software-buoc-chan-xanh
> Trạng thái bản thiết kế: đủ để Dev triển khai bố cục + tông màu. Các số liệu sự kiện thật
> (ngày, địa điểm, phí, giải thưởng, tên nhà tài trợ) **chưa có trong MSR-9 / TEC-59** nên trong
> tài liệu này chỉ là **placeholder, ghi rõ [CHỜ XÁC NHẬN]** — Dev KHÔNG hardcode chúng thành
> sự thật, mà đặt vào biến/cấu hình để PO/BA điền sau.

## 1. Nguyên tắc chung

- **Mobile-first (ưu tiên điện thoại):** thiết kế xong bản mobile trước, rồi mở rộng lên
  tablet/desktop. Trang vẫn responsive đầy đủ, không phải bản mobile cắt gọn.
- **Một cột, cuộn dọc, một thông điệp mỗi màn hình:** người xem lướt nhanh vẫn hiểu
  "đây là giải chạy nào, chạy khi nào, đăng ký ở đâu".
- **Nút đăng ký luôn trong tầm tay:** nút CTA chính xuất hiện ở hero, sau khối cự ly,
  và ở cuối trang — bấm vào cuộn tới form đăng ký (không mở trang khác).
- **Tông xanh lá + trắng, năng động:** nền trắng là chủ đạo, xanh lá làm điểm nhấn;
  không dùng nền xanh đậm tràn trang (nặng, khó đọc trên điện thoại).
- **Không dùng ảnh người thật, thương hiệu thật:** minh họa dùng họa tiết lá, dấu chân,
  đường chạy trừu tượng. Logo nhà tài trợ chỉ hiển thị khi PO cung cấp file thật.

## 2. Bảng màu (design token — Dev dùng đúng mã này)

| Vai trò | Token | Mã màu | Ghi chú |
|---|---|---|---|
| Xanh lá chính | `--green` | `#1E7A34` | Nút chính, tiêu đề khối, icon |
| Xanh lá đậm | `--green-dark` | `#145A26` | Tiêu đề hero, footer, chữ nhấn |
| Xanh lá nhạt (nền khối) | `--green-light` | `#E6F4EA` | Nền xen kẽ: khối cự ly, giải thưởng |
| Xanh lá non (điểm nhấn) | `--green-lime` | `#7BC950` | Vạch trang trí, badge, không dùng làm chữ trên nền trắng |
| Nền chính | `--bg` | `#FFFFFF` | |
| Nền phụ | `--bg-soft` | `#F6F8F5` | Nền xen kẽ nhẹ với `--green-light` |
| Chữ chính | `--text` | `#1A2E1F` | Gần đen ngả xanh, đọc êm hơn đen thuần |
| Chữ phụ | `--text-muted` | `#5A6B5E` | Chú thích, ngày/giờ phụ |
| Viền | `--border` | `#D8E4D9` | Viền thẻ, ô nhập liệu |
| Cảnh báo/lỗi form | `--error` | `#C0392B` | Chỉ dùng cho lỗi nhập liệu |

Quy tắc tương phản: chữ trên nền trắng dùng `--green-dark` hoặc `--text`;
không đặt chữ `--green-lime` trên nền trắng (tương phản kém).

## 3. Kiểu chữ và nhịp bố cục

- **Font chữ:** Be Vietnam Pro (Google Fonts, hỗ trợ tốt tiếng Việt), fallback
  `system-ui, -apple-system, "Segoe UI", sans-serif`. Tiêu đề: đậm (700–800);
  thân bài: thường (400), dòng tiêu đề phụ 600.
- **Cỡ chữ (mobile → desktop):** tiêu đề hero 32px → 56px; tiêu đề khối 24px → 32px;
  thân bài 16px; chú thích 14px. Không dùng chữ thân bài dưới 16px trên mobile.
- **Lưới:** một cột trên mobile; tối đa 1120px ở giữa trên desktop.
  Khoảng cách giữa các khối: 64px (mobile) / 96px (desktop); lề hai bên mobile 16–20px.
- **Breakpoint:** mobile < 640px · tablet 640–1024px · desktop > 1024px.
- **Nút bấm:** bo tròn 999px (dạng viên thuốc), cao tối thiểu 48px, vùng chạm
  tối thiểu 44×44px; nút chính nền `--green`, chữ trắng; nút phụ viền xanh, nền trắng.

## 4. Bản đồ các khối (thứ tự từ trên xuống dưới)

| # | Khối | ID gợi ý | Nội dung từ MSR-9 | Ghi chú bố cục |
|---|---|---|---|---|
| S0 | Header cố định | `#header` | — | Logo chữ "Bước Chân Xanh 2026" + nút "Đăng ký ngay"; khi cuộn vẫn thấy |
| S1 | Hero | `#hero` | Tên giải, tinh thần gây quỹ trồng cây | Xem §5 |
| S2 | Đồng hồ đếm ngược | `#countdown` | Đếm ngược tới ngày chạy | Ngay sau hero, luôn thấy sớm |
| S3 | Thời gian & địa điểm | `#info` | Thời gian, địa điểm | Xem §7 |
| S4 | Cự ly & phí | `#distances` | 3km / 5km / 10km + phí đăng ký | 3 thẻ, xem §8 |
| S5 | Lộ trình | `#route` | Lộ trình từng cự ly | Xem §9 |
| S6 | Giải thưởng | `#prizes` | Giải thưởng | Xem §10 |
| S7 | Form đăng ký | `#register` | Họ tên, cự ly, cỡ áo | Xem §11 |
| S8 | Nhà tài trợ | `#sponsors` | Danh sách nhà tài trợ | Xem §12 |
| S9 | Footer | `#footer` | — | Tên giải, liên hệ [CHỜ XÁC NHẬN], ghi chú gây quỹ |

Đối chiếu Acceptance Criteria: mọi khối trong MSR-9 (thời gian, địa điểm, 3 cự ly + phí,
lộ trình, giải thưởng, đếm ngược, form đăng ký, nhà tài trợ) đều có đúng một vị trí
trong bảng trên — không khối nào bị thiếu, không khối nào xuất hiện ở hai chỗ khác nhau
(trừ nút CTA dẫn về form, đó là điều hướng chứ không phải nội dung lặp).

## 5. S1 — Hero

- **Mobile:** tiêu đề lớn trên cùng, phía dưới là dải minh họa trừu tượng
  (lá + dấu chân + đường chạy cong, tông xanh lá trên nền trắng), rồi nút CTA.
  **Desktop:** hai cột — trái chữ, phải minh họa; không để minh họa lấn chữ.
- **Nội dung:** dòng nhỏ trên tiêu đề: "Giải chạy từ thiện · Gây quỹ trồng cây";
  tiêu đề: "BƯỚC CHÂN XANH 2026"; dòng phụ 1–2 câu về ý nghĩa gây quỹ trồng cây
  (lời văn do BA/PO duyệt, không bịa con số cây đã trồng).
- **CTA chính:** nút "Đăng ký ngay" → cuộn tới `#register`. Dưới nút, dòng nhỏ:
  "3 cự ly · 3km / 5km / 10km" (đây là dữ liệu có thật từ MSR-9).
- **Không đặt** ngày, địa điểm hay mức phí trong hero nếu chưa xác nhận — các số đó
  chỉ xuất hiện ở khối chuyên trách (S3, S4) dưới dạng placeholder.

## 6. S2 — Đồng hồ đếm ngược

- **Hiển thị:** 4 ô (Ngày / Giờ / Phút / Giây), số lớn, nền `--green-dark`, chữ trắng,
  xếp ngang trên desktop, xếp 4 ô vừa màn hình mobile (không cuộn ngang).
- **Hành vi:** đếm lùi theo thời gian thực tới mốc ngày chạy; mốc này lấy từ biến cấu
  hình, hiện tại là `[CHỜ XÁC NHẬN — ngày chạy chưa có trong MSR-9]`.
- **Khi tới ngày chạy:** đồng hồ chuyển thành dòng "Sự kiện đang diễn ra" thay vì
  hiển thị số âm. Không tự suy ra ngày chạy từ năm 2026.
- **Tiếp cận:** mỗi ô có nhãn đọc được (không chỉ hiện số); cập nhật không làm
  trình đọc màn hình đọc lại liên tục (aria-live="off" hoặc cập nhật thưa).

## 7. S3 — Thời gian & địa điểm

- **Bố cục:** 2 thẻ song song trên desktop, xếp dọc trên mobile:
  thẻ "Thời gian" (icon đồng hồ) và thẻ "Địa điểm" (icon ghim).
- **Nội dung:** mỗi thẻ gồm tiêu đề + dòng chính + dòng phụ.
  Hiện tại cả hai dòng chính đều là placeholder:
  - Thời gian: `[CHỜ XÁC NHẬN — ngày + giờ xuất phát]`
  - Địa điểm: `[CHỜ XÁC NHẬN — địa điểm tập trung/xuất phát]`
- **Không thêm** bản đồ nhúng, giờ giấc chi tiết hay lịch trình từng chặng nếu PO
  chưa cung cấp — Dev chỉ chừa vị trí, không bịa nội dung.

## 8. S4 — Cự ly & phí đăng ký

- **Bố cục:** 3 thẻ bằng nhau, xếp dọc trên mobile, 3 cột trên desktop.
  Thẻ 5km (cự ly giữa) được nhấn nhẹ: viền xanh đậm hơn + badge "Phổ biến nhất"
  (đây là gợi ý trình bày, PO có thể đổi thẻ nhấn sang cự ly khác).
- **Mỗi thẻ gồm, theo thứ tự:** tên cự ly lớn (3km / 5km / 10km) → dòng mô tả
  đối tượng phù hợp 1 câu (ví dụ: 3km cho người mới, gia đình) → mức phí lớn →
  nút "Chọn cự ly này" (bấm vào cuộn tới form và tự chọn sẵn cự ly đó trong form).
- **Mức phí:** `[CHỜ XÁC NHẬN — phí từng cự ly chưa có trong MSR-9]`.
  Dev hiển thị đúng 3 mức phí tương ứng 3 cự ly khi có số liệu, không tự đặt giá.
- **Ghi chú dưới 3 thẻ:** 1 dòng về quyền lợi chung (áo, huy chương, nước uống…)
  chỉ khi PO xác nhận — hiện để placeholder, không liệt kê quyền lợi bịa.

## 9. S5 — Lộ trình

- **Bố cục:** danh sách dọc theo 3 cự ly, mỗi cự ly một hàng/thẻ:
  tên cự ly → các điểm mốc theo thứ tự (xuất phát → … → về đích) nối bằng đường kẻ.
  Mobile: đường kẻ dọc bên trái; desktop: có thể dàn ngang nhưng vẫn giữ thứ tự mốc.
- **Nội dung mốc lộ trình:** `[CHỜ XÁC NHẬN — tên đường/điểm mốc từng cự ly]`.
  Không vẽ bản đồ giả, không ghi tên đường chưa được xác nhận.
- **Nếu PO chỉ cung cấp lộ trình chung (không chia theo cự ly):** hiển thị một lộ trình
  chung + ghi rõ cự ly nào rẽ ở mốc nào, thay vì nhân bản 3 lộ trình giống nhau.

## 10. S6 — Giải thưởng

- **Bố cục:** lưới thẻ: giải chung cuộc (cúp/huy chương) + giải theo cự ly nếu có.
  Mobile 1 cột, tablet 2 cột, desktop 3 cột.
- **Nội dung:** `[CHỜ XÁC NHẬN — cơ cấu giải thưởng, giá trị, điều kiện nhận giải]`.
  Không ghi số tiền thưởng, không hứa "mọi người đều có giải" khi chưa xác nhận.
- **Quy tắc trình bày:** giải cao nhất đặt đầu tiên, chữ lớn hơn; không dùng màu vàng
  chói tràn thẻ (giữ tông xanh lá + trắng, chỉ điểm xuyết vàng nhạt cho cúp nếu cần).

## 11. S7 — Form đăng ký

- **Đúng 3 trường theo MSR-9, không tự thêm trường bắt buộc:**
  1. Họ tên — ô nhập chữ, bắt buộc, tối thiểu 2 ký tự.
  2. Cự ly — chọn 1 trong 3 (nút radio dạng thẻ: 3km / 5km / 10km), bắt buộc.
     Khi bấm "Chọn cự ly này" ở S4, trường này tự chọn sẵn cự ly đó.
  3. Cỡ áo — danh sách chọn (S / M / L / XL / XXL), bắt buộc; có bảng gợi ý
     "chọn theo cân nặng/chiều cao" chỉ khi PO cung cấp bảng đó.
- **Nút gửi:** "Hoàn tất đăng ký" (nút chính). Khi gửi thành công: hiện thông báo
  xác nhận ngay trong form ("Đã nhận đăng ký của bạn!") — nội dung xác nhận chi tiết
  (email/SMS, mã số bib) là `[CHỜ XÁC NHẬN]` vì MSR-9 không nói cách trả kết quả.
- **Lỗi nhập liệu:** báo ngay dưới trường sai, chữ `--error`, không xóa dữ liệu đã nhập.
- **Gửi đi đâu / lưu ở đâu:** ngoài phạm vi bản thiết kế này — Dev hỏi PO/BA trước khi
  nối backend hay dịch vụ form; bản thiết kế chỉ quy định giao diện và kiểm tra nhập liệu.

## 12. S8 — Nhà tài trợ

- **Bố cục:** lưới logo: mobile 2 cột, tablet 3 cột, desktop 4–5 cột, logo xám nhẹ
  khi chưa rê chuột, hiện màu gốc khi rê (desktop).
- **Nội dung:** `[CHỜ XÁC NHẬN — tên + logo nhà tài trợ]`. Chưa có logo thật thì
  hiển thị khung giữ chỗ ghi tên nhà tài trợ bằng chữ, không dùng logo thương hiệu
  thật nào làm ví dụ.
- **Phân tầng (nếu PO cung cấp):** nhà tài trợ kim cương/vàng/bạc hiển thị logo lớn
  hơn theo tầng; không có phân tầng thì mọi logo cùng cỡ.

## 13. S9 — Footer & các chi tiết cuối trang

- Nền `--green-dark`, chữ trắng. Nội dung: tên giải, dòng "Giải chạy từ thiện gây quỹ
  trồng cây", liên hệ `[CHỜ XÁC NHẬN]`, link quay lại đầu trang.
- Không thêm link mạng xã hội, hotline hay email nếu chưa được PO cung cấp.

## 14. Tương tác, chuyển động, tiếp cận

- **Chuyển động:** chỉ dùng hiệu ứng nhẹ — nút đổi màu khi rê, thẻ nâng nhẹ, cuộn
  mượt tới form. Không hiệu ứng nhấp nháy, không tự phát video nền.
- **Người dùng giảm chuyển động** (prefers-reduced-motion): tắt toàn bộ hiệu ứng.
- **Tiếp cận:** tương phản chữ/nền đạt tối thiểu 4.5:1 cho chữ thường; mọi nút và ô
  nhập đều tới được bằng bàn phím và có viền focus thấy rõ; ảnh minh họa có văn bản
  thay thế (alt) mô tả đúng nội dung.
- **Hiệu năng mobile:** minh họa dùng SVG/CSS thay vì ảnh nặng; không tải font hay
  thư viện ngoài mức cần thiết cho một trang tĩnh.

## 15. Checklist bàn giao cho Dev

- [ ] Đúng thứ tự khối S0 → S9 và đúng ID gợi ý (để link/CTA hoạt động).
- [ ] Đúng mã màu §2 và font §3; không tự đổi tông sang màu khác.
- [ ] Mọi placeholder `[CHỜ XÁC NHẬN]` nằm trong một file cấu hình/biến duy nhất,
      không rải rác hardcode trong từng khối; khi PO điền số liệu, chỉ sửa file đó.
- [ ] Form đủ 3 trường (§11), kiểm tra nhập liệu, thông báo thành công/lỗi tại chỗ.
- [ ] Đếm ngược chạy theo thời gian thực, tới ngày thì đổi trạng thái (§6).
- [ ] Kiểm tra ở 3 cỡ màn hình: 360px (mobile), 768px (tablet), 1280px (desktop);
      không cuộn ngang, nút CTA luôn bấm được.
- [ ] Không có tên đường, mức phí, giải thưởng, logo hay thông tin liên hệ nào
      bịa thêm ngoài các placeholder đã ghi rõ ở trên.

---
*Bản thiết kế này chỉ quyết định giao diện/bố cục. Số liệu sự kiện thật do PO/BA
cung cấp sau; Dev triển khai khung trang trước, điền số liệu khi có.*
