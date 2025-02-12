import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "styles/info.services.scss";

export const InfoServicesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="info-services-page">
      <div className="title">Thông Tin Dịch Vụ</div>
      <div id="dieu_tri_tuy_rang" className="service">
        <img src="https://i.imgur.com/Rdydhyz.png" />
        <div className="title">Điều Trị Tủy Răng</div>
        <div className="content">
          <div>
            Tủy răng đóng vai trò quan trọng trong việc nuôi dưỡng và duy trì
            sức khỏe răng. Khi răng bị sâu hoặc viêm nhiễm, tủy răng bị tổn
            thương gây đau nhức dữ dội và có thể dẫn đến những biến chứng nguy
            hiểm. Điều trị tủy răng tại ThreeGay là giải pháp tối ưu giúp bạn:
          </div>
          <ul>
            <li>
              Loại bỏ phần tủy bị tổn thương, làm sạch và trám kín ống tủy
            </li>
            <li>Bảo tồn răng thật, ngăn ngừa mất răng</li>
            <li>Chấm dứt cơn đau, khó chịu do viêm tủy</li>
          </ul>
          <div>
            Tại ThreeGay, quy trình điều trị tủy răng được thực hiện bởi đội ngũ
            bác sĩ chuyên nghiệp, giàu kinh nghiệm, với sự hỗ trợ của công nghệ
            và thiết bị hiện đại, đảm bảo an toàn và hiệu quả.
          </div>
          <div>
            Điều trị tủy răng tại ThreeGay không chỉ là việc loại bỏ cơn đau, mà
            còn là sự tận tâm, chu đáo của đội ngũ y bác sĩ. Chúng tôi hiểu
            rằng, mỗi bệnh nhân đều có những nỗi lo lắng riêng, và chúng tôi
            luôn lắng nghe, chia sẻ để giúp bạn cảm thấy thoải mái và an tâm
            trong suốt quá trình điều trị.
          </div>
          <div>
            Chúng tôi luôn cập nhật những phương pháp và kỹ thuật điều trị tủy
            răng mới nhất, nhằm mang đến cho bệnh nhân những trải nghiệm điều
            trị tốt nhất, giảm thiểu đau đớn và thời gian phục hồi.
          </div>
        </div>
      </div>
      <div id="nha_khoa_tham_my" className="service">
        <img src="https://i.imgur.com/lmA46di.png" />
        <div className="title">Nha khoa thẩm mỹ</div>
        <div className="content">
          <div>
            Nụ cười rạng rỡ là chìa khóa giúp bạn tự tin hơn trong giao tiếp và
            thành công trong cuộc sống. Nha khoa thẩm mỹ tại ThreeGay cung cấp
            đa dạng các dịch vụ, từ những kỹ thuật đơn giản như tẩy trắng răng,
            trám răng thẩm mỹ, đến những phương pháp phức tạp hơn như dán sứ
            veneer, bọc răng sứ, giúp bạn sở hữu nụ cười đẹp như mong muốn:
          </div>
          <ul>
            <li>
              Dán sứ veneer: Che phủ khuyết điểm răng, mang lại hàm răng đều đẹp
            </li>
            <li>
              Bọc răng sứ: Phục hình răng bị hư hỏng, mang lại răng chắc khỏe,
              thẩm mỹ
            </li>
          </ul>
          <div>
            Với sự tận tâm và mắt thẩm mỹ tinh tế, các bác sĩ tại ThreeGay sẽ tư
            vấn và thiết kế nụ cười phù hợp với khuôn mặt và sở thích của từng
            khách hàng.
          </div>
          <div>
            Tại ThreeGay, chúng tôi không chỉ đơn thuần là "chữa răng", mà còn
            là "kiến tạo nụ cười". Chúng tôi luôn đặt mình vào vị trí của khách
            hàng, lắng nghe mong muốn của bạn, và tư vấn những giải pháp tối ưu
            nhất, giúp bạn có được nụ cười tự tin và rạng rỡ.
          </div>
          <div>
            Chúng tôi sử dụng các vật liệu nha khoa cao cấp, có nguồn gốc rõ
            ràng, đảm bảo an toàn và bền đẹp cho nụ cười của bạn.
          </div>
        </div>
      </div>
      <div id="cay_ghep_nha_khoa" className=" service">
        <img src="https://i.imgur.com/TuDSR45.png" />
        <div className="title">Cấy ghép nha khoa</div>
        <div className="content">
          <div>
            Mất răng không chỉ gây khó khăn trong ăn nhai mà còn ảnh hưởng đến
            thẩm mỹ và tâm lý của người bệnh. Cấy ghép nha khoa tại ThreeGay là
            giải pháp tối ưu giúp bạn:
          </div>
          <ul>
            <li>Khôi phục răng đã mất, lấy lại khả năng ăn nhai</li>
            <li>Ngăn ngừa tiêu xương, giữ gìn cấu trúc xương hàm</li>
            <li>Cải thiện thẩm mỹ, mang lại nụ cười tự tin</li>
          </ul>
          <div>
            ThreeGay sử dụng các loại implant cao cấp, có độ bền cao và khả năng
            tích hợp tốt với xương hàm, đảm bảo kết quả cấy ghép thành công và
            lâu dài.
          </div>
          <div>
            Cấy ghép nha khoa tại ThreeGay là một hành trình "tìm lại nụ cười"
            đầy ý nghĩa. Chúng tôi hiểu rằng, việc mất răng không chỉ là vấn đề
            về sức khỏe, mà còn là nỗi lo lắng về thẩm mỹ và sự tự tin. Vì vậy,
            chúng tôi luôn đồng hành cùng bạn trên suốt hành trình này, từ quá
            trình thăm khám, tư vấn, đến khi bạn có được nụ cười mới, khỏe mạnh
            và rạng rỡ.
          </div>
          <div>
            Đội ngũ bác sĩ cấy ghép nha khoa tại ThreeGay được đào tạo chuyên
            sâu, có nhiều năm kinh nghiệm thực hiện các ca cấy ghép phức tạp,
            đảm bảo an toàn và hiệu quả cho bệnh nhân.
          </div>
        </div>
      </div>
      <div id="tay_trang_rang" className="service">
        <img src="https://i.imgur.com/dSk2GJ5.png" />
        <div className="title">Tẩy trắng răng</div>
        <div className="content">
          <div>
            Hàm răng ố vàng, xỉn màu khiến bạn cảm thấy thiếu tự tin? Đừng lo
            lắng, dịch vụ tẩy trắng răng tại ThreeGay sẽ giúp bạn "hô biến" hàm
            răng trở nên trắng sáng, rạng rỡ. Chúng tôi sử dụng các phương pháp
            tẩy trắng răng an toàn, hiệu quả, không gây hại cho men răng và nướu
          </div>

          <div>
            Tại ThreeGay, bạn sẽ được tư vấn và lựa chọn phương pháp tẩy trắng
            răng phù hợp với tình trạng răng và mong muốn của mình.
          </div>
          <div>
            Một hàm răng trắng sáng không chỉ là yếu tố thẩm mỹ, mà còn là biểu
            tượng của sức khỏe và sự tự tin. Tại ThreeGay, chúng tôi giúp bạn
            đạt được điều đó bằng những phương pháp tẩy trắng răng an toàn, hiệu
            quả, và phù hợp với từng cá nhân.
          </div>
          <div>
            Chúng tôi sử dụng các sản phẩm tẩy trắng răng chất lượng cao, được
            kiểm định chặt chẽ, đảm bảo an toàn cho sức khỏe răng miệng của bạn.
          </div>
        </div>
      </div>
      <div id="nha_khoa_cap_cuu" className="service">
        <img src="https://i.imgur.com/vTv3XD5.png" />
        <div className="title">Nha khoa cấp cứu</div>
        <div className="content">
          <div>
            Những cơn đau răng bất ngờ luôn khiến bạn khó chịu và lo lắng. Nha
            khoa cấp cứu tại ThreeGay hoạt động 24/7, sẵn sàng hỗ trợ bạn mọi
            lúc mọi nơi:
          </div>
          <ul>
            <li>Cấp cứu đau răng, chảy máu răng, răng bị lung lay, gãy, vỡ</li>
            <li>Xử lý nhiễm trùng răng miệng</li>
          </ul>
          <div>
            Với đội ngũ bác sĩ chuyên nghiệp, giàu kinh nghiệm, nha khoa cấp cứu
            tại ThreeGay sẽ giúp bạn giải quyết nhanh chóng các vấn đề răng
            miệng khẩn cấp, giảm đau và an tâm hơn.
          </div>
          <div>
            Những cơn đau răng bất ngờ có thể ập đến bất cứ lúc nào, gây ảnh
            hưởng không nhỏ đến cuộc sống của bạn. Hiểu được điều đó, Nha khoa
            cấp cứu ThreeGay luôn sẵn sàng hỗ trợ bạn 24/7. Chỉ cần bạn liên hệ,
            chúng tôi sẽ có mặt ngay lập tức để giúp bạn giải quyết cơn đau và
            những vấn đề răng miệng khẩn cấp.
          </div>
          <div>
            Chúng tôi luôn trang bị đầy đủ các thiết bị y tế cần thiết để xử lý
            kịp thời và hiệu quả các trường hợp cấp cứu răng miệng.
          </div>
        </div>
      </div>
      <div id="phong_ngua" className="service">
        <img src="https://i.imgur.com/A3u80ZL.png" />
        <div className="title">Phòng ngừa</div>
        <div className="content">
          <div>
            Phòng ngừa luôn tốt hơn chữa bệnh. ThreeGay cung cấp các dịch vụ
            phòng ngừa nha khoa như:
          </div>
          <ul>
            <li>Khám răng định kỳ: Phát hiện sớm các vấn đề răng miệng</li>
            <li>Cạo vôi răng: Loại bỏ mảng bám, ngăn ngừa viêm lợi</li>
            <li>Trám răng dự phòng: Ngăn ngừa sâu răng phát triển</li>
          </ul>
          <div>
            Việc phòng ngừa nha khoa thường xuyên sẽ giúp bạn duy trì sức khỏe
            răng miệng tốt nhất, tiết kiệm chi phí điều trị và có nụ cười tự
            tin.
          </div>
          <div>
            Sức khỏe răng miệng là nền tảng cho một cuộc sống khỏe mạnh và hạnh
            phúc. Tại ThreeGay, chúng tôi khuyến khích bạn xây dựng thói quen
            chăm sóc răng miệng tốt và đến khám răng định kỳ để phát hiện sớm
            các vấn đề và có biện pháp can thiệp kịp thời.
          </div>
          <div>
            Chúng tôi luôn tư vấn và hướng dẫn bạn cách chăm sóc răng miệng đúng
            cách, giúp bạn duy trì sức khỏe răng miệng tốt nhất.
          </div>
        </div>
      </div>
      <div id="tu_van" className="service">
        <img src="https://i.imgur.com/WMskvef.png" />
        <div className="title">Tư vấn</div>
        <div className="content">
          <div>
            Đội ngũ bác sĩ tư vấn tại ThreeGay luôn sẵn sàng lắng nghe và giải
            đáp mọi thắc mắc của bạn về răng miệng. Chúng tôi sẽ cung cấp cho
            bạn những thông tin hữu ích về:
          </div>
          <ul>
            <li>Các bệnh lý răng miệng</li>
            <li>Các phương pháp điều trị</li>
            <li>Cách chăm sóc răng miệng đúng cách</li>
          </ul>
          <div>
            Đến với ThreeGay, bạn sẽ được tư vấn tận tình, chu đáo, giúp bạn
            hiểu rõ hơn về tình trạng răng miệng của mình và đưa ra quyết định
            tốt nhất cho sức khỏe của mình.
          </div>
          <div>
            Chúng tôi hiểu rằng, việc tìm hiểu về các vấn đề răng miệng có thể
            gặp nhiều khó khăn. Vì vậy, đội ngũ tư vấn của ThreeGay luôn sẵn
            sàng lắng nghe và giải đáp mọi thắc mắc của bạn một cách tận tình và
            dễ hiểu nhất.
          </div>
          <div>
            Bạn có thể đặt lịch hẹn tư vấn trực tiếp tại phòng khám hoặc liên hệ
            qua điện thoại, email để được hỗ trợ nhanh chóng.
          </div>
        </div>
      </div>
    </div>
  );
};
