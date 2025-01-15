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
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Thêm độ trễ
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullname,
    phone,
    password,
  });
};

export const fetchAccountAPI = () => {
  const urlBackend = "/api/accounts/user/";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend);
};

export const getAllDoctorAPI = () => {
  const urlBackend = "/api/admin/get-all-doctor/";
  return axios.get<IBackendRes<IDoctor[]>>(urlBackend);
};

export const getListServicesAPI = () => {
  const urlBackend = "/api/services/";
  return axios.get<IBackendRes<IServices[]>>(urlBackend);
};

export const getUsersAPI = (query: string) => {
  const urlBackend = `/api/users/?${query}`;
  return axios.get<IBackendRes<IModePaginate<IUser>>>(urlBackend);
};
export const createUserAPI = (
  phone: string,
  fullname: string,
  password: string,
  birthDay: string,
  address: string,
  role: string
) => {
  const urlBackend = "/api/admin/admin_register/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    phone,
    fullname,
    password,
    birthDay,
    address,
    role,
  });
};

export const deleteUserAPI = (phone: string) => {
  const urlBackend = `/api/admin/delete/?phone=${phone}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};

export const updateUserAPI = (
  phone: string,
  fullname: string,
  birthDay: string,
  address: string
) => {
  const urlBackend = "/api/admin/Update_user/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    phone,
    fullname,
    birthDay,
    address,
  });
};

export const getBookingAPI = (query: string) => {
  const urlBackend = `/api/admin/Booking/?${query}`;
  return axios.get<IBackendRes<IModePaginate<IBooking>>>(urlBackend);
};
