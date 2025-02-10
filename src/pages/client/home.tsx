import { Button, Flex, Space, Input, Form, Collapse, Card } from "antd";
import welcome from "assets/home/welcome.png";
import welcomeDoctor from "assets/home/welcome-doctor.png";
import rootCanal from "assets/home/root-canal-treatment.png";
import dentalImplans from "assets/home/cosmetic-dentist.png";
import cosmeticDentist from "assets/home/cosmetic-dentist.png";
import callUs from "assets/home/call-us.png";
import whyChoose from "assets/home/why-choose.png";
import preciseSmile from "assets/home/precise-smile.png";
import "styles/home.scss";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GoShieldCheck } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllDoctorAPI } from "@/services/api";

export const HomePage = () => {
  // const [doctors, setDoctors] = useState<IDoctor[]>([]);

  // useEffect(() => {
  //   const getDataDoctor = async () => {
  //     const res = await getAllDoctorAPI();
  //     if (res && res?.data) {
  //       setDoctors(res.data);
  //     }
  //     console.log(doctors);
  //   };
  //   getDataDoctor();
  // }, []);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <div className="welcome">
        <div className="welcome__img">
          <img src={welcome} />
        </div>
        <div className="welcome__content">
          <div className="title">
            Sẵn sàng cho trải nghiệm nha khoa tuyệt vời nhất của bạn!
          </div>
          <div className="detail">
            Chúng tôi chỉ sử dụng những vật liệu chất lượng tốt nhất trên thị
            trường để mang đến sản phẩm tối ưu cho bệnh nhân. Vì vậy, hãy yên
            tâm và đặt lịch ngay hôm nay!
          </div>
          <Flex align="center" gap={20}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/booking")}
            >
              Đặt lịch ngay!
            </Button>
            <Button
              type="primary"
              icon={<BsFillTelephoneFill />}
              size="large"
            />
            <Flex vertical>
              <div style={{ color: "#1376F8", fontWeight: "bold" }}>
                Nha Khoa cấp cứu 24h
              </div>
              <div>0123456789</div>
            </Flex>
          </Flex>
          <div className="doctor">
            <div style={{ display: "flex", gap: "10px" }}>
              <img src={welcomeDoctor} />
              <div className="name">
                <div className="">Thomas Daniel</div>
                <div>Sr Dental</div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              Dịch vụ nha khoa hàng đầu được thực hiện bởi các chuyên gia trong
              lĩnh vực, được khuyến nghị cho mọi người!
            </div>
          </div>
        </div>
      </div>
      <div className="top-services">
        <div className="top-services__card">
          <img src={rootCanal} />
          <div className="name">Root Canal Treatment</div>
          <div className="detail">
            Root canal treatment (endodontics) is a dental procedure used to
            treat infection at the centre of a tooth.
          </div>
          <div className="learn-more">Learn More</div>
        </div>

        <div className="top-services__card">
          <img src={cosmeticDentist} />
          <div className="name">Cosmetic Dentist</div>
          <div className="detail">
            Cosmetic dentistry is the branch of dentistry that focuses on
            improving the appearance of your smile.
          </div>
          <div className="learn-more">Learn More</div>
        </div>

        <div className="top-services__card">
          <img src={dentalImplans} />
          <div className="name">Dental Implants</div>
          <div className="detail">
            A dental implant is an artificial tooth root that’s placed into your
            jaw to hold a prosthetic tooth or bridge.
          </div>
          <div className="learn-more">Learn More</div>
        </div>
      </div>
      <div className="call-us">
        <div className="call-us__content">
          <div className="title">
            Chúng tôi chào đón bệnh nhân mới và rất háo hức được gặp bạn!
          </div>
          <div className="detail">
            Chúng tôi cam kết sử dụng công nghệ tiên tiến và vật liệu cao cấp để
            mang đến cho bạn dịch vụ nha khoa an toàn và hiệu quả nhất!
          </div>
          <Form name="submit-phone" autoComplete="off">
            <Form.Item name="phone">
              <Space.Compact style={{ width: "80%" }}>
                <Input placeholder="SĐT" />
                <Button type="primary">Gửi</Button>
              </Space.Compact>
            </Form.Item>
          </Form>
        </div>
        <div className="call-us__img">
          <img src={callUs} />
        </div>
      </div>
      <div className="why-choose">
        <div className="why-choose__img">
          <img src={whyChoose} />
        </div>
        <div className="why-choose__content">
          <div className="title">
            Tại sao nên chọn ThreeGay cho mọi nhu cầu chăm sóc răng miệng của
            bạn?
          </div>
          <div className="detail">
            Là lựa chọn hoàn hảo cho mọi nhu cầu nha khoa của bạn, với đội ngũ
            chuyên gia tận tâm, công nghệ hiện đại và dịch vụ chất lượng cao,
            đảm bảo mang đến cho bạn nụ cười khỏe đẹp nhất!
          </div>
          <div className="list-why">
            <div className="why">
              <GoShieldCheck />
              <div>Đội ngũ nha khoa hàng đầu, tận tâm và giàu kinh nghiệm!</div>
            </div>
            <div className="why">
              <GoShieldCheck />
              <div>Dịch vụ nha khoa tiên tiến với công nghệ hiện đại nhất!</div>
            </div>
            <div className="why">
              <GoShieldCheck />
              <div>Ưu đãi giảm giá cho tất cả các dịch vụ nha khoa!</div>
            </div>
            <div className="why">
              <GoShieldCheck />
              <div>Đăng ký nhanh chóng và dễ dàng!</div>
            </div>
          </div>
          <Button type="primary" style={{ width: "100px" }}>
            Đặt lịch
          </Button>
        </div>
      </div>
      <div className="precise-smile">
        <div className="precise-smile__content">
          <div className="title">
            Hãy gác lại mọi lo lắng và tận hưởng nụ cười khỏe đẹp, rạng rỡ hơn!
          </div>
          <div className="detail">
            Hãy để lại mọi lo âu phía sau, bước vào không gian nha khoa hiện đại
            và tận hưởng một nụ cười khỏe mạnh, rạng rỡ với sự chăm sóc tận tâm
            từ các chuyên gia của chúng tôi!
          </div>
          <Button type="primary" style={{ width: "100px" }}>
            Đặt lịch
          </Button>
        </div>
        <div className="precise-smile__img">
          <img src={preciseSmile} />
        </div>
      </div>
      <div className="specialists">
        <div className="specialists__title">
          Gặp gỡ các chuyên gia nha khoa của chúng tôi!
        </div>
        <div className="specialists__detail">
          Hãy gặp gỡ đội ngũ chuyên gia nha khoa giàu kinh nghiệm của chúng tôi,
          những người luôn sẵn sàng mang đến cho bạn sự chăm sóc tận tâm và chất
          lượng nhất!
        </div>
        <div className="specialists__content">
          <Swiper
            slidesPerView={3}
            spaceBetween={1}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, FreeMode, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img alt="example" src="https://i.imgur.com/V6vsg6o.png" />
                }
              >
                <Meta title="Doctor 1" description="working" />
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img alt="example" src="https://i.imgur.com/LV2W6ub.png" />
                }
              >
                <Meta title="Doctor 2" description="working" />
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img alt="example" src="https://i.imgur.com/fQDbbJv.png" />
                }
              >
                <Meta title="Doctor 3" description="working" />
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img alt="example" src="https://i.imgur.com/wzktDHu.png" />
                }
              >
                <Meta title="Doctor 4" description="working" />
              </Card>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="question">
        <div className="question__title">Câu hỏi thường gặp</div>
        <div className="question__detail">
          Những thắc mắc thường gặp của khách hàng và câu trả lời chi tiết để
          giúp bạn hiểu rõ hơn về dịch vụ nha khoa của chúng tôi!
        </div>
        <Collapse
          accordion
          size="large"
          style={{ width: "800px" }}
          items={[
            {
              key: "1",
              label: "Tôi có thể đặt lịch hẹn trực tuyến không?",
              children: (
                <p>
                  Có! Bạn có thể dễ dàng đặt lịch hẹn trực tuyến qua website
                  hoặc liên hệ trực tiếp với chúng tôi qua điện thoại.
                </p>
              ),
            },
            {
              key: "2",
              label: "Quy trình tẩy trắng răng có an toàn không?",
              children: (
                <p>
                  Hoàn toàn an toàn! Chúng tôi sử dụng công nghệ hiện đại và các
                  sản phẩm được kiểm định để đảm bảo hiệu quả và an toàn cho
                  răng của bạn
                </p>
              ),
            },
            {
              key: "3",
              label: "Tôi có cần khám răng định kỳ không?",
              children: (
                <p>
                  Có! Khám răng định kỳ 6 tháng một lần giúp phát hiện sớm các
                  vấn đề nha khoa và giữ cho răng miệng luôn khỏe mạnh.
                </p>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
