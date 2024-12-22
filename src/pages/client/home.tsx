import "../../styles/home.scss";
import welcome from "../../assets/home/welcome.png";

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="welcome">
        <div className="welcome__content"></div>
        <div className="welcome__img">
          <img src={welcome} />
        </div>
      </div>
    </div>
  );
};
