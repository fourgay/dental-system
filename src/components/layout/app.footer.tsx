import { useNavigate } from "react-router-dom";
import {
  FaFoursquare,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./app.footer.scss";
import { Divider } from "antd";

export const AppFooter = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer-container">
        <footer className="page-footer">
          <div className="page-footer-1">
            <div className="page-footer-1__logo" onClick={() => navigate("/")}>
              <FaFoursquare className="logo" />
              <span>ThreeGay</span>
            </div>
            <div className="page-footer-1__detail">
              <div className="home" onClick={() => navigate("/")}>
                Trang Chủ
              </div>
              <div className="services" onClick={() => navigate("/services")}>
                Dịch Vụ
              </div>
              <div className="about-us" onClick={() => navigate("/aboutus")}>
                Giới Thiệu
              </div>
            </div>
          </div>
          <Divider style={{ border: "2px solid black" }}></Divider>
          <div className="social">
            <FaFacebook />
            <FaInstagram />
            <FaYoutube />
            <BsTwitterX />
          </div>
        </footer>
      </div>
    </>
  );
};
