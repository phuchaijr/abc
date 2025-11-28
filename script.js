// Dữ liệu giả lập
const linesData = [
  { code: "EW", name: "East West Line", status: "Operating", stations: 35 },
  { code: "NS", name: "North South Line", status: "Closed", stations: 27 },
  { code: "CC", name: "Circle Line", status: "Maintenance", stations: 12 },
  { code: "DT", name: "Downtown Line", status: "Operating", stations: 41 },
  { code: "NE", name: "North East Line", status: "Operating", stations: 16 },
];

document.addEventListener("DOMContentLoaded", () => {
  // Render lần đầu và thêm hiệu ứng animation
  renderTable(linesData);
});

function renderTable(data) {
  const tbody = document.getElementById("line-table-body");
  tbody.innerHTML = "";

  data.forEach((line, index) => {
    let statusClass = "";
    if (line.status === "Operating") statusClass = "operating";
    else if (line.status === "Closed") statusClass = "closed";
    else statusClass = "maintenance";

    const tr = document.createElement("tr");

    // Thêm animation delay cho từng dòng (Dòng 1 hiện ngay, dòng 2 trễ 0.1s, v.v...)
    tr.style.animation = `fadeInRow 0.5s ease forwards ${index * 0.1}s`;
    tr.style.opacity = "0"; // Ẩn ban đầu để chờ animation

    tr.innerHTML = `
            <td><strong>${line.code}</strong></td>
            <td>${line.name}</td>
            <td><span class="status ${statusClass}">${line.status}</span></td>
            <td>${line.stations} Stations</td>
            <td>
                <button class="btn-white icon-btn"><i class="fa-solid fa-ellipsis"></i></button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

// Thêm Keyframes cho animation dòng bảng vào document (hoặc để trong CSS)
const style = document.createElement("style");
style.innerHTML = `
    @keyframes fadeInRow {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .icon-btn { border: none; padding: 8px; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
    .icon-btn:hover { background: #eee; color: var(--primary-color); }
`;
document.head.appendChild(style);

function showPage(pageId) {
  // Lấy các phần tử
  const linesPage = document.getElementById("lines-page");
  const otherPage = document.getElementById("other-page");
  const menuItems = document.querySelectorAll(".menu li a");

  // Reset Animation: Xóa class rồi thêm lại để animation chạy lại từ đầu
  linesPage.style.animation = "none";
  otherPage.style.animation = "none";

  // Trigger reflow (kỹ thuật bắt buộc để reset animation)
  void linesPage.offsetWidth;

  // Active menu styling
  menuItems.forEach((item) => item.classList.remove("active"));
  event.currentTarget.classList.add("active");

  if (pageId === "lines") {
    linesPage.style.display = "block";
    linesPage.style.animation = "slideUpFade 0.5s ease forwards"; // Chạy lại hiệu ứng
    otherPage.style.display = "none";

    // Render lại bảng để chạy lại hiệu ứng từng dòng
    renderTable(linesData);
  } else {
    linesPage.style.display = "none";
    otherPage.style.display = "block";
    otherPage.style.animation = "slideUpFade 0.5s ease forwards"; // Chạy lại hiệu ứng
    otherPage.querySelector("h2").innerText =
      pageId.charAt(0).toUpperCase() + pageId.slice(1) + " Management";
  }
}

function searchFunction() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filteredData = linesData.filter(
    (line) =>
      line.name.toLowerCase().includes(input) ||
      line.code.toLowerCase().includes(input)
  );
  renderTable(filteredData);
}
// --- THÊM VÀO CUỐI FILE script.js ---

// Hàm bật tắt Sidebar trên Mobile
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".main-content");

  // Thêm hoặc xóa class 'active'
  sidebar.classList.toggle("active");
}

// Tự động đóng Sidebar khi click ra ngoài vùng nội dung (UX tốt hơn)
document.addEventListener("click", function (event) {
  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  // Nếu màn hình nhỏ VÀ đang mở menu VÀ click KHÔNG phải vào menu/nút
  if (
    window.innerWidth <= 992 &&
    sidebar.classList.contains("active") &&
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    sidebar.classList.remove("active");
  }
});
