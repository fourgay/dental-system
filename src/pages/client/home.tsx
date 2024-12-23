import { Button, Flex, Space, Input, Form } from "antd";
import welcome from "../../assets/home/welcome.png";
import welcomeDoctor from "../../assets/home/welcome-doctor.png";
import rootCanal from "../../assets/home/root-canal-treatment.png";
import dentalImplans from "../../assets/home/cosmetic-dentist.png";
import cosmeticDentist from "../../assets/home/cosmetic-dentist.png";
import callUs from "../../assets/home/call-us.png";
import whyChoose from "../../assets/home/why-choose.png";
import preciseSmile from "../../assets/home/precise-smile.png";
import "../../styles/home.scss";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GoShieldCheck } from "react-icons/go";

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="welcome">
        <div className="welcome__img">
          <img src={welcome} />
        </div>
        <div className="welcome__content">
          <div className="title">
            Get ready for your best ever Dental Experience!
          </div>
          <div className="detail">
            We use only the best quality materials on the market in order to
            provide the best products to our patients, So don’t worry about
            anything and book yourself.
          </div>
          <Flex align="center" gap={20}>
            <Button type="primary" size="large">
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
              Top Quailty dental treatment done by field experts, Highly
              Recommended for everyone
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
            We’re welcoming new patients and can’t wait to meet you.
          </div>
          <div className="detail">
            We use only the best quality materials on the market in order to
            provide the best products to our patients, So don’t worry about
            anything and book yourself.
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
            Why choose Smile for all your dental treatments?
          </div>
          <div className="detail">
            We use only the best quality materials on the market in order to
            provide the best products to our patients.
          </div>
          <div className="list-why">
            <div className="why">
              <GoShieldCheck />
              <div>Top quality dental team</div>
            </div>
            <div className="why">
              <GoShieldCheck />
              <div>State of the art dental services</div>
            </div>
            <div className="why">
              <GoShieldCheck />
              <div>Discount on all dental treatment</div>
            </div>
            <div className="why">
              <GoShieldCheck />
              <div>Enrollment is quick and easy</div>
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
            Leave your worries at the door and enjoy a healthier, more precise
            smile
          </div>
          <div className="detail">
            We use only the best quality materials on the market in order to
            provide the best products to our patients, So don’t worry about
            anything and book yourself.
          </div>
          <Button type="primary" style={{ width: "100px" }}>
            Đặt lịch
          </Button>
        </div>
        <div className="precise-smile__img">
          <img src={preciseSmile} />
        </div>
      </div>
    </div>
  );
};
