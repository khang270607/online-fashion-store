🛍️ Online Fashion Store
📌 Giới thiệu dự án

Trong bối cảnh chuyển đổi số ngày càng mạnh mẽ, các cửa hàng thời trang vừa và nhỏ đang đối mặt với nhu cầu cấp thiết trong việc hiện đại hóa quy trình quản lý bán hàng và kho vận. Dự án này được xây dựng nhằm phát triển hệ thống quản lý bán hàng trực tuyến phù hợp với mô hình hoạt động thực tế của các cửa hàng thời trang quy mô nhỏ và vừa, giúp tối ưu hóa quy trình vận hành và nâng cao hiệu quả kinh doanh.

Hệ thống được phát triển dựa trên việc vận dụng các kiến thức về phân tích – thiết kế hệ thống thông tin, kết hợp với các công nghệ Web hiện đại như React, Node.js và MongoDB, hướng đến một giải pháp quản lý linh hoạt, dễ mở rộng và thân thiện với người dùng.

🎯 Mục tiêu nghiên cứu

Dự án hướng tới việc xây dựng một hệ thống quản lý bán hàng trực tuyến hoàn chỉnh với các mục tiêu cụ thể sau:

Phân tích và thiết kế hệ thống quản lý bán hàng đáp ứng nhu cầu thực tiễn của cửa hàng thời trang.

Áp dụng kiến trúc Single Page Application (SPA) nhằm nâng cao trải nghiệm người dùng.

Sử dụng các công nghệ Web hiện đại:

React cho giao diện người dùng

Node.js + ExpressJS cho backend API

MongoDB cho cơ sở dữ liệu NoSQL

Phát triển các chức năng nghiệp vụ:

Quản lý tài khoản

Quản lý nội dung

Quản lý sản phẩm

Quản lý đơn hàng

Quản lý kho

Tích hợp chức năng thống kê và báo cáo dữ liệu hỗ trợ công tác quản lý.

Xây dựng cơ chế xác thực người dùng bằng JSON Web Token (JWT).

Triển khai phân quyền người dùng theo mô hình Role-Based Access Control (RBAC).

🔍 Đối tượng và phạm vi nghiên cứu
Đối tượng nghiên cứu

Hệ thống quản lý bán hàng trực tuyến trong lĩnh vực thời trang, hướng đến các cửa hàng vừa và nhỏ.

Phạm vi nghiên cứu

Phạm vi chức năng:
Tập trung vào các nghiệp vụ cốt lõi như tài khoản, nội dung, sản phẩm, đơn hàng và kho; đồng thời đảm bảo bảo mật thông qua JWT và phân quyền RBAC.

Phạm vi công nghệ:

Frontend: React (SPA)

Backend: Node.js, ExpressJS

Database: MongoDB

Authentication & Authorization: JWT, RBAC

Phạm vi ứng dụng:
Phù hợp với các cửa hàng thời trang vừa và nhỏ chưa có hệ thống quản lý bán hàng số hóa chuyên biệt.

🛠️ Phương pháp nghiên cứu & phát triển

Dự án được triển khai theo phương pháp Agile, chia nhỏ công việc thành các tác vụ tương ứng với từng chức năng và phát triển theo các chu kỳ ngắn (sprint). Quy trình phát triển bao gồm:

Phân tích yêu cầu

Thiết kế hệ thống

Lập trình

Kiểm thử

Đánh giá và cải tiến

Yêu cầu hệ thống được thu thập thông qua khảo sát thực tế tại các cửa hàng thời trang truyền thống, kết hợp với góp ý chuyên môn từ giảng viên hướng dẫn nhằm đảm bảo tính khả thi và sát với thực tế.

🧱 Kiến trúc hệ thống
🔹 Kiến trúc phân tầng (Layered Architecture)

Hệ thống được tổ chức theo kiến trúc phân tầng, bao gồm:

Presentation Layer: Routes, Middleware

Controller Layer: Điều phối luồng xử lý

Service Layer: Xử lý nghiệp vụ

Data Layer: MongoDB + Mongoose

Kiến trúc này giúp mã nguồn rõ ràng, dễ bảo trì và mở rộng.

🔹 Single Page Application (SPA)

Frontend được xây dựng theo mô hình SPA, chỉ tải dữ liệu khi cần thiết, giúp:

Tăng tốc độ phản hồi

Giảm băng thông

Nâng cao trải nghiệm người dùng

🔐 Bảo mật và phân quyền

JWT (JSON Web Token) được sử dụng cho xác thực người dùng theo cơ chế stateless.

RBAC (Role-Based Access Control) giúp kiểm soát quyền truy cập theo vai trò, tuân thủ nguyên tắc “ít quyền nhất” (Least Privilege).

🧪 Tiêu chí đánh giá

Hệ thống đáp ứng đầy đủ các chức năng đã đề ra

Thời gian phản hồi trung bình dưới 1 giây

Hoạt động ổn định, không phát sinh lỗi nghiêm trọng

Giao diện thân thiện, dễ sử dụng

Mã nguồn rõ ràng, dễ mở rộng và bảo trì
