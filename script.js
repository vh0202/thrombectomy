// Xử lý sự kiện khi form được submit
document.getElementById('medical-data-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hiển thị thông báo đang xử lý
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Đang gửi...';
    submitBtn.disabled = true;
    
    // Thu thập dữ liệu từ form
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Gửi dữ liệu đến Google Sheets
    fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('Dữ liệu đã được lưu thành công!');
            document.getElementById('medical-data-form').reset();
        } else {
            alert('Có lỗi xảy ra: ' + data.error);
        }
    })
    .catch(error => {
        alert('Có lỗi xảy ra: ' + error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});
