import axios from "services/axios.customize";

export const loginAPI = (phone: string, password: string) => {
  const urlBackend = "/api/accounts/login/";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { phone, password });
};

export const registerAPI = async (
  fullname: string,
  phone: string,
  password: string
) => {
  const urlBackend = "/api/accounts/register/";
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Thêm độ trễ
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullname,
    phone,
    password,
  });
};
