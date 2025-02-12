import { getListServicesAPI } from "@/services/api";
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
        setListServices(res.data.result);
      }
      setIsLoading(false);
    };
    getServices();
  }, []);

  return (
    <div className="services-page">
      <div className="list-services">
        <div className="list-services__title">Dịch Vụ</div>
        <div className="list-services__detail">
          Các dịch vụ nha khoa toàn diện của chúng tôi bao gồm từ chăm sóc răng
          miệng tổng quát đến nha khoa thẩm mỹ và phục hình, giúp bạn có một nụ
          cười khỏe đẹp và tự tin hơn mỗi ngày!
        </div>
        <Spin spinning={isLoading}>
          <div className="list-services__content">
            {listServices?.map((item, index) => (
              <div
                className="card"
                onClick={() => {
                  navigate(`/info-services#${item.name}`);
                }}
              >
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
