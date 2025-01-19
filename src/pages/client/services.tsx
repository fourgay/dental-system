import { userCurrentApp } from "@/components/context/app.context";
import { getListServicesAPI } from "@/services/api";
import { CheckCard } from "@ant-design/pro-components";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/services.scss";

export const ServicesPage = () => {
  const [listServices, setListServices] = useState<IServices[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getServices = async () => {
      setIsLoading(true);
      const res = await getListServicesAPI();
      if (res?.data) {
        setListServices(res.data);
      }
      setIsLoading(false);
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
        <Spin spinning={isLoading}>
          <div className="list-services__content">
            {listServices.map((item, index) => (
              <div className="card">
                <img src={item.img} />
                <div className="name">{item.title}</div>
                <div className="detail">{item.detail}</div>
              </div>
            ))}
          </div>
        </Spin>
      </div>
    </div>
  );
};
