import axios from "services/axios.customize";

export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login/";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
};

export const registerAPI = (
  fullName: string,
  phone: string,
  password: string
) => {
  const urlBackend = "/api/accounts/register/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullName,
    phone,
    password,
  });
};
