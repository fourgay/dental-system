import { userCurrentApp } from "@/components/context/app.context";
import { getListServicesAPI } from "@/services/api";
import { CheckCard } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/services.scss";

export const ServicesPage = () => {
  const [listServices, setListServices] = useState<IServices[]>([]);
  const navigate = useNavigate();
  const { setIsAppLoading } = userCurrentApp();

  useEffect(() => {
    const getServices = async () => {
      const res = await getListServicesAPI();
      if (res?.data) {
        setListServices(res.data);
      }
    };
    getServices();
  }, []);

  return (
    <div className="services-page">
      <div className="list-services">
        <div className="list-services__title">Services</div>
        <div className="list-services__detail">
          We use only the best quality materials on the market in order to
          provide the best products to our patients.
        </div>
        <div className="list-services__content">
          {listServices.map((item, index) => (
            <div className="card">
              <img src={item.img} />
              <div className="name">{item.title}</div>
              <div className="detail">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
