import { useLocation, useNavigate } from "react-router-dom";
import "./app.header.scss";
import { FaFoursquare } from "react-icons/fa";
import { Affix, Button } from "antd";
import { userCurrentApp } from "../context/app.context";

export const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    userCurrentApp();

  //tạm logout
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };
  return (
    <>
      {/* <div className="header-container">
        <header className="page-header">
          <div className="page-header__logo" onClick={() => navigate("/")}>
            <FaFoursquare className="logo" />
            <span>ThreeGay</span>
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
            <div
              className={
                location.pathname == "/aboutus" ? "aboutus bold" : "aboutus"
              }
              onClick={() => navigate("/aboutus")}
            >
              Giới Thiệu
            </div>
            <div className="contact">Liên Hệ</div>
          </div>
          <div className="page-header__auth">
            {!isAuthenticated ? (
              <div>
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
            ) : (
              <div>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleLogout()}
                >
                  {user?.fullname}
                </Button>
              </div>
            )}
          </div>
        </header>
      </div> */}
      <Affix offsetTop={0}>
        <div className="header-container">
          <header className="page-header">
            <div className="page-header__logo" onClick={() => navigate("/")}>
              <FaFoursquare className="logo" />
              <span>ThreeGay</span>
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
              <div
                className={
                  location.pathname == "/aboutus" ? "aboutus bold" : "aboutus"
                }
                onClick={() => navigate("/aboutus")}
              >
                Giới Thiệu
              </div>
              <div className="contact">Liên Hệ</div>
            </div>
            <div className="page-header__auth">
              {!isAuthenticated ? (
                <div>
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
              ) : (
                <div>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => handleLogout()}
                  >
                    {user?.fullname}
                  </Button>
                </div>
              )}
            </div>
          </header>
        </div>
      </Affix>
    </>
  );
};
