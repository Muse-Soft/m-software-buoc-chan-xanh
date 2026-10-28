// S2 Đồng hồ đếm ngược + S7 Form đăng ký.
// Mọi số liệu sự kiện đọc từ EVENT_CONFIG (config.js); file này KHÔNG
// hardcode ngày chạy, phí hay thông tin liên hệ. Khi PO/BA điền ngày
// chạy thật vào config.js (định dạng ISO, ví dụ "2026-12-20T06:00:00+07:00",
// hoặc "20/12/2026 06:00"), đồng hồ tự chạy mà không cần sửa code.
// Gửi form: chưa nối backend (ngoài phạm vi đặc tả thiết kế) — gửi xong
// chỉ hiện thông báo xác nhận tại chỗ, dữ liệu không lưu đi đâu.
(function () {
  var ALLOWED_DISTANCES = ["3km", "5km", "10km"];
  var ALLOWED_SIZES = ["S", "M", "L", "XL", "XXL"];

  // Phân tích ngày chạy: chấp nhận ISO (Date.parse) và dạng DD/MM/YYYY
  // [HH:mm]. Trả về đối tượng Date, hoặc null khi chưa xác nhận/không
  // phân tích được — khi đó giao diện hiển thị đúng placeholder.
  function parseEventDate(raw) {
    if (!raw || typeof raw !== "string") return null;
    var iso = Date.parse(raw);
    if (!isNaN(iso)) return new Date(iso);
    var m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?$/);
    if (!m) return null;
    var d = new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0));
    if (d.getFullYear() !== +m[3] || d.getMonth() !== +m[2] - 1 ||
        d.getDate() !== +m[1]) return null;
    return d;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  // Tính số ngày/giờ/phút/giây còn lại. Trả về null khi đã tới mốc.
  function computeRemaining(target, now) {
    var diff = target.getTime() - now.getTime();
    if (diff <= 0) return null;
    var totalSeconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds / 3600) % 24,
      minutes: Math.floor(totalSeconds / 60) % 60,
      seconds: totalSeconds % 60
    };
  }

  function renderCountdown() {
    var statusEl = document.getElementById("countdown-status");
    var daysEl = document.getElementById("cd-days");
    var hoursEl = document.getElementById("cd-hours");
    var minutesEl = document.getElementById("cd-minutes");
    var secondsEl = document.getElementById("cd-seconds");
    if (!statusEl || !daysEl) return;
    var target = parseEventDate(
      typeof EVENT_CONFIG !== "undefined" ? EVENT_CONFIG.eventDate : "");
    if (!target) {
      // Ngày chạy chưa xác nhận: hiện đúng placeholder, không bịa số.
      daysEl.textContent = "--";
      hoursEl.textContent = "--";
      minutesEl.textContent = "--";
      secondsEl.textContent = "--";
      statusEl.textContent = typeof EVENT_CONFIG !== "undefined"
        ? EVENT_CONFIG.eventDate : "";
      return;
    }
    var remaining = computeRemaining(target, new Date());
    if (!remaining) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      statusEl.textContent = "Sự kiện đang diễn ra";
      return;
    }
    daysEl.textContent = pad(remaining.days);
    hoursEl.textContent = pad(remaining.hours);
    minutesEl.textContent = pad(remaining.minutes);
    secondsEl.textContent = pad(remaining.seconds);
    statusEl.textContent = "";
  }

  // Kiểm tra 3 trường bắt buộc; trả về object lỗi theo từng trường
  // (chuỗi rỗng = hợp lệ). Không xóa dữ liệu đã nhập khi báo lỗi.
  function validateRegistration(name, distance, size) {
    var errors = { name: "", distance: "", size: "" };
    if (!name || name.trim().length < 2) {
      errors.name = "Vui lòng nhập họ tên (tối thiểu 2 ký tự).";
    }
    if (ALLOWED_DISTANCES.indexOf(distance) === -1) {
      errors.distance = "Vui lòng chọn một cự ly: 3km, 5km hoặc 10km.";
    }
    if (ALLOWED_SIZES.indexOf(size) === -1) {
      errors.size = "Vui lòng chọn cỡ áo: S, M, L, XL hoặc XXL.";
    }
    return errors;
  }

  function setupForm() {
    var form = document.getElementById("register-form");
    if (!form) return;
    var nameInput = document.getElementById("reg-name");
    var sizeSelect = document.getElementById("reg-size");
    var successEl = document.getElementById("register-success");

    // Nút "Chọn cự ly này" ở S4 tự chọn sẵn cự ly trong form (DESIGN §8).
    document.querySelectorAll("[data-distance]").forEach(function (link) {
      link.addEventListener("click", function () {
        var radio = form.querySelector(
          'input[name="distance"][value="' +
          link.getAttribute("data-distance") + '"]');
        if (radio) radio.checked = true;
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var distance = "";
      var checked = form.querySelector('input[name="distance"]:checked');
      if (checked) distance = checked.value;
      var errors = validateRegistration(
        nameInput.value, distance, sizeSelect.value);
      document.getElementById("error-name").textContent = errors.name;
      document.getElementById("error-distance").textContent = errors.distance;
      document.getElementById("error-size").textContent = errors.size;
      if (errors.name || errors.distance || errors.size) {
        successEl.hidden = true;
        successEl.textContent = "";
        return;
      }
      successEl.hidden = false;
      successEl.textContent = "Đã nhận đăng ký của bạn! " +
        "Họ tên: " + nameInput.value.trim() +
        " · Cự ly: " + distance + " · Cỡ áo: " + sizeSelect.value + ".";
    });
  }

  renderCountdown();
  if (typeof setInterval === "function") {
    setInterval(renderCountdown, 1000);
  }
  setupForm();
})();
