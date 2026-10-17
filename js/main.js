function handleCrawlFromHtml() {
    const htmlText = document.getElementById('rawHtmlInput').value.trim();
    const urlInput = document.getElementById('crawlUrl').value.trim() || 'https://dantri.com.vn/';
    const alertBox = document.getElementById('crawlSuccessAlert');
    const alertCatName = document.getElementById('alertCatName');
    const jsonPreview = document.getElementById('jsonPreview');

    if (!htmlText) {
        alert("Vui lòng dán mã nguồn HTML của bài viết vào khung bên dưới!");
        return;
    }

    // Kiểm tra nếu dán nhầm URL thay vì mã HTML
    if (htmlText.startsWith('http://') || htmlText.startsWith('https://')) {
        alert("Bạn đang dán URL bài viết vào đây! Vui lòng nhập URL vào ô trên cùng rồi bấm nút Crawl, HOẶC dán mã nguồn HTML (xem nguồn trang) vào ô này.");
        return;
    }

    try {
        let article = null;
        if (typeof parseDantriDom === 'function') {
            article = parseDantriDom(htmlText, urlInput);
        }

        if (article && article.title && article.title.length > 0) {
            savePostToStorage(article);

            alertCatName.innerText = article.category || 'Thời sự';
            alertBox.style.display = "block";
            jsonPreview.innerText = JSON.stringify(article, null, 2);
            jsonPreview.style.display = "block";

            renderLocalStorageList();
        } else {
            alert("Mã HTML không chứa nội dung bài viết Dân Trí hợp lệ!");
        }
    } catch (e) {
        alert("Mã nguồn HTML không hợp lệ!");
    }
}
