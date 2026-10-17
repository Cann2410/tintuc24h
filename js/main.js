function renderCrawlerPage() {
    const app = document.getElementById('appView');
    if (!app) return;

    document.querySelectorAll('.nav-menu a').forEach(el => el.classList.remove('active'));

    app.innerHTML = `
        <div class="crawler-box">
            <p class="crawler-desc">Nhập URL một bài viết trên dantri.com.vn, hệ thống sẽ lấy nội dung, chuẩn hóa thành JSON và lưu vào LocalStorage.</p>
            
            <div class="crawl-input-group">
                <input type="text" id="crawlUrl" value="https://dantri.com.vn/bat-dong-san/ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat-20260928122246655.htm" placeholder="Nhập đường dẫn bài viết Dân trí...">
                <button class="btn-crawl" onclick="handleCrawl()">Crawl</button>
            </div>

            <details class="fallback-accordion">
                <summary>► Cách dự phòng: nếu bấm Crawl bị lỗi, dán mã nguồn HTML của bài viết vào đây</summary>
                <div class="fallback-content">
                    <textarea id="rawHtmlInput" rows="6" placeholder="Dán toàn bộ mã nguồn HTML của bài viết Dân trí vào đây..."></textarea>
                    <button class="btn-crawl" style="margin-top: 10px;" onclick="handleCrawlFromHtml()">Phân tích HTML & Lưu</button>
                </div>
            </details>

            <div id="crawlSuccessAlert" class="alert-success" style="display:none;">
                Đã cập nhật bài viết vào LocalStorage. Xem tại trang chủ / chuyên mục <span id="alertCatName" style="font-weight:bold;"></span>.
            </div>

            <pre class="json-preview" id="jsonPreview" style="display:none;"></pre>

            <div class="local-storage-section">
                <h3 class="local-storage-title">Bài mới nhất trong LocalStorage</h3>
                <div id="localStorageList" class="local-storage-list"></div>
                <button class="btn-reset-data" onclick="resetDefaultData()">Reset dữ liệu mẫu</button>
            </div>
        </div>
    `;

    renderLocalStorageList();
}
