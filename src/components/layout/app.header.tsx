import { useLocation, useNavigate } from "react-router-dom";
import "./app.header.scss";
import { FaFoursquare } from "react-icons/fa";
import { Button } from "antd";

export const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__logo" onClick={() => navigate("/")}>
            <FaFoursquare className="logo" />
            <span>FourGay</span>
          </div>
          <div className="page-header__detail">
            <div
              className={location.pathname == "/" ? "home bold" : "home"}
              onClick={() => navigate("/")}
            >
              Trang Chủ
            </div>
            <div className="services">Dịch Vụ</div>
            <div className="blogs">Blogs</div>
            <div className="about-us">Giới Thiệu</div>
            <div className="contact">Liên Hệ</div>
          </div>
          <div className="page-header__auth">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/login")}
            >
              Đăng Nhập
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/register")}
            >
              Đăng Ký
            </Button>
          </div>
        </header>
      </div>
    </>
  );
};
