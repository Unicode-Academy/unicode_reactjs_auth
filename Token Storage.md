# Lưu Access Token và Refresh Token ở đâu?

## localStorage hoặc sessionStorage

1. Cross-Site Scripting (XSS)

XSS xảy ra khi một kẻ tấn công có thể chèn mã JavaScript độc hại vào trang web của bạn. Nếu thành công, mã độc này có thể truy cập vào localStorage và lấy JWT token của người dùng.

2. Tấn công qua các thư viện không an toàn

Nếu bạn sử dụng các thư viện JavaScript từ các nguồn không tin cậy, mã độc có thể được chèn vào ứng dụng của bạn và truy cập vào localStorage.

3. Tấn công thông qua lừa đảo (Phishing)

Kẻ tấn công có thể tạo một trang web giả mạo giống hệt trang của bạn và lừa người dùng đăng nhập. Sau khi người dùng đăng nhập, trang giả mạo này có thể sử dụng mã JavaScript để lấy JWT từ localStorage và gửi về máy chủ của kẻ tấn công.

Giải pháp:

1. Sử dụng các biện pháp phòng chống XSS

- Lọc và mã hóa tất cả đầu vào người dùng trước khi hiển thị trên trang web.
- Sử dụng các thư viện bảo mật như DOMPurify để lọc các nội dung HTML.
- Cấu hình Content Security Policy (CSP) để giảm thiểu khả năng chèn mã độc.

2. Tránh sử dụng localStorage cho các thông tin nhạy cảm

3. Kiểm tra các thư viện bên thứ ba

Đảm bảo các thư viện bạn sử dụng là từ các nguồn tin cậy và được cập nhật thường xuyên

4. Cảnh giác với các cuộc tấn công lừa đảo (Phishing)

- Sử dụng xác thực hai yếu tố (2FA) để tăng cường bảo mật tài khoản người dùng.
- Cảnh báo người dùng nhận biết các trang web và email lừa đảo.

## Cookie

1. Cross-Site Request Forgery (CSRF)

CSRF là cuộc tấn công trong đó kẻ tấn công lừa người dùng thực hiện các hành động ngoài ý muốn trên một trang web mà họ đã xác thực. Vì cookie tự động được gửi cùng với mọi yêu cầu tới cùng một miền, kẻ tấn công có thể lợi dụng điều này.

Cách bảo vệ chống lại CSRF:

- Sử dụng CSRF Tokens: Mỗi yêu cầu POST, PUT, DELETE cần đi kèm với một token CSRF đặc biệt mà chỉ server và client biết.
- Kiểm tra Origin và Referer Headers: Xác minh rằng các yêu cầu nhạy cảm xuất phát từ miền của bạn.

2. Cookie Theft (Đánh cắp cookie)

Ngay cả khi sử dụng HttpOnly, cookie vẫn có thể bị đánh cắp nếu server của bạn bị tấn công hoặc nếu kẻ tấn công có thể thực hiện một cuộc tấn công MITM (Man-In-The-Middle) nếu không sử dụng HTTPS

Cách bảo vệ:
Sử dụng HTTPS: Bảo đảm rằng tất cả các giao tiếp giữa client và server được mã hóa.
Thiết lập thuộc tính Secure cho cookie: Điều này đảm bảo cookie chỉ được gửi qua các kết nối HTTPS.

3. Cross-Site Script Inclusion (XSSI)

- Kẻ tấn công có thể lạm dụng việc bao gồm các script từ miền khác để truy cập dữ liệu không bảo vệ.

- Nếu server của bạn không cấu hình chính sách CORS đúng cách, kẻ tấn công có thể chèn script từ miền khác để truy cập tài nguyên trên server của bạn.

Cách bảo vệ:

- Cấu hình chính sách CORS đúng cách: Đảm bảo rằng chỉ các miền đáng tin cậy mới có thể truy cập tài nguyên trên server của bạn.
- Sử dụng Content Security Policy (CSP): Hạn chế nguồn các script mà trang web của bạn có thể tải.

4. Tấn công thông qua Subdomain

Nếu trang web của bạn có nhiều subdomain và chúng chia sẻ cookie, một subdomain không an toàn có thể dẫn đến việc đánh cắp cookie từ các subdomain khác.

Cách bảo vệ:

Thiết lập thuộc tính SameSite cho cookie
