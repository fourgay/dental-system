import { Button } from "antd";
import introduce from "assets/about-us/about-us.png";
import doctor1 from "assets/about-us/doctor-1.png";
import doctor2 from "assets/about-us/doctor-2.png";
import doctor3 from "assets/about-us/doctor-3.png";
import technology from "assets/about-us/latest-technology.png";
import { useEffect } from "react";

import "styles/about.us.scss";

export const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-us-page">
      <div className="introduce">
        <div className="introduce__title">Giới thiệu</div>
        <div className="introduce__img">
          <img src={introduce} />
        </div>
        <div className="introduce__content">
          <div className="title">Sứ mệnh của chúng tôi</div>
          <div className="detail">
            <div>
              Tại ThreeGay, con người luôn là ưu tiên hàng đầu. Chúng tôi giúp
              từng bệnh nhân đạt được sức khỏe tối ưu bằng cách tiếp cận toàn
              diện đối với sức khỏe răng miệng. Điều này không chỉ dừng lại ở
              việc điều trị sâu răng mà còn chú trọng đến sự phát triển sọ mặt,
              cân bằng khớp cắn và khớp hàm, hệ vi khuẩn khoang miệng, chức năng
              cơ hàm và tính tương thích sinh học của vật liệu nha khoa. Sự chăm
              sóc tận tâm và kế hoạch điều trị kỹ lưỡng của chúng tôi luôn hướng
              đến mục tiêu nâng cao sức khỏe tổng thể và chất lượng cuộc sống
              cho bệnh nhân.
            </div>
            <div
              style={{
                fontWeight: "500",
                fontSize: "20px",
                margin: "20px 0",
                textTransform: "capitalize",
              }}
            >
              Hơn bất cứ điều gì, chúng tôi yêu thích việc mang đến những nụ
              cười rạng rỡ và khỏe mạnh!
            </div>
            <div>
              Chúng tôi luôn nỗ lực cập nhật những kỹ thuật và công nghệ tiên
              tiến nhất để đảm bảo bệnh nhân nhận được sự chăm sóc tốt nhất.
              Phòng khám sử dụng công nghệ chụp X-quang 3D CBCT, giúp hỗ trợ
              phẫu thuật và điều trị nội nha có hướng dẫn, cho phép mô phỏng kỹ
              thuật số trước khi thực hiện phẫu thuật nhằm đạt kết quả tối ưu.
              Hình ảnh 3D cũng được ứng dụng trong phân tích sự phát triển và
              tăng trưởng đường thở. Ngoài ra, chúng tôi sử dụng máy quét quang
              học 3D hiện đại nhất cho các phục hình nha khoa và lấy dấu
              Invisalign. Bác sĩ Williams đặc biệt ủng hộ việc áp dụng kỹ thuật
              vi phẫu, giúp giảm khó chịu và rút ngắn thời gian hồi phục cho
              bệnh nhân.
            </div>
          </div>
        </div>
      </div>
      <div className="specialists">
        <div className="specialists__title">
          {" "}
          Gặp gỡ các chuyên gia nha khoa của chúng tôi!
        </div>
        <div className="specialists__detail">
          Hãy gặp gỡ đội ngũ chuyên gia nha khoa giàu kinh nghiệm của chúng tôi,
          những người luôn sẵn sàng mang đến cho bạn sự chăm sóc tận tâm và chất
          lượng nhất!
        </div>
        <div className="specialists__content">
          <div className="card">
            <div className="card-img">
              <img src={doctor1} />
            </div>
            <div className="card-content">
              <div className="title">DR. Brent</div>
              <div className="detail">
                Bác sĩ Brent cung cấp các dịch vụ nha khoa tổng quát và thẩm mỹ
                tại Northern Heights Dental ở Flagstaff, Arizona. Ông có nhiều
                kinh nghiệm trong các lĩnh vực như phục hình toàn hàm, mặt dán
                sứ, mão răng, cầu răng, cấy ghép implant, nhổ răng khôn,
                Invisalign và răng giả. Bác sĩ Brent và em gái lớn lên tại
                Massachusetts trong một gia đình có mẹ là chuyên viên vệ sinh
                răng miệng và ông ngoại là bác sĩ nha khoa tổng quát.
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={doctor2} />
            </div>
            <div className="card-content">
              <div className="title">DR. Ashish J. Vashi</div>
              <div className="detail">
                Bác sĩ Ashish J. Vashi đã có hơn 18 năm kinh nghiệm trong lĩnh
                vực nha khoa tổng quát, thẩm mỹ và cấy ghép tại California. Ông
                luôn đặt chất lượng điều trị lên hàng đầu, mang đến cho bệnh
                nhân sự chăm sóc tận tâm trong một môi trường thoải mái. Bác sĩ
                Vashi không chỉ quan tâm đến tình trạng răng miệng mà còn chú
                trọng đến từng bệnh nhân với sự thấu hiểu và gắn kết. Ông có
                chuyên môn sâu rộng trong các dịch vụ như phục hình toàn hàm,
                mặt dán sứ, mão răng, cầu răng, cấy ghép implant, nhổ răng khôn,
                Invisalign và răng giả.
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={doctor3} />
            </div>
            <div className="card-content">
              <div className="title">Dr. James Connors</div>
              <div className="detail">
                Khi nhắc đến các bác sĩ phẫu thuật răng hàm mặt, ít ai có thể
                sánh được với danh tiếng của bác sĩ James Connors. Là chuyên gia
                phẫu thuật miệng và hàm mặt của chúng tôi, bác sĩ Connors không
                chỉ mang đến chuyên môn dày dặn mà còn tạo cảm giác thoải mái
                cho bệnh nhân bằng những cuộc trò chuyện thân thiện và – tất
                nhiên – bộ sưu tập nơ bướm đầy phong cách của mình. Bác sĩ
                Connors và em gái lớn lên tại Massachusetts trong một gia đình
                có mẹ là chuyên viên vệ sinh răng miệng và ông ngoại là bác sĩ
                nha khoa tổng quát.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="technology">
        <div className="technology__title">Công nghệ tiên tiến nhất</div>
        <div className="technology__detail">
          Nhờ những bước tiến vượt bậc trong công nghệ, nha khoa ngày nay có thể
          xử lý những ca phức tạp nhất một cách nhanh chóng và hiệu quả hơn.
        </div>
        <div className="technology__content">
          <div className="img">
            <img src={technology} />
          </div>
          <div className="main">
            <div
              style={{
                fontWeight: "500",
                fontSize: "20px",
                textTransform: "capitalize",
                marginBottom: "20px",
              }}
            >
              Tương lai của nha khoa là công nghệ kỹ thuật số!
            </div>
            <div>
              <div>
                Ngày nay, các nha sĩ đã sử dụng phần mềm để thu thập dữ liệu hỗ
                trợ quyết định lâm sàng. Trong tương lai, những công nghệ này sẽ
                tiếp tục phát triển, tích hợp thuật toán AI giúp bác sĩ tìm ra
                phương pháp điều trị tối ưu nhất cho bệnh nhân.
              </div>
              <div style={{ margin: "20px 0" }}>
                Trong thế kỷ 21, chụp X-quang kỹ thuật số và hình ảnh 3D đã trở
                thành tiêu chuẩn trong chăm sóc nha khoa. Việc sử dụng máy quét
                trong miệng với dữ liệu số hóa để lấy dấu răng 3D cho mão răng
                (thay vì sử dụng chất lấy dấu polyvinyl siloxane hoặc cao su)
                nay đã trở nên phổ biến.
              </div>
              <div>
                Trí tuệ nhân tạo đang đặt nền móng cho tương lai của ngành nha
                khoa. Giờ đây, robot nha khoa có thể thực hiện các nhiệm vụ như
                trám răng, làm sạch và thậm chí nhổ răng.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
