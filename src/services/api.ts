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
  return axios.get<IBackendRes<IModePaginate<IServices>>>(urlBackend);
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
    isBooking: false,
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

export const createBookingAPI = (
  fullname: string,
  date: string,
  time: string,
  forAnother: boolean,
  remark: string,
  service: string | undefined,
  account: string | undefined,
  doctor: string
) => {
  const urlBackend = "/api/admin/register_booking/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullname,
    date,
    time,
    forAnother,
    remark,
    service,
    account,
    doctor,
    status: "Đang chờ",
  });
};

export const deleteBookingAPI = (phone: string | undefined) => {
  const urlBackend = `/api/admin/delete-booking/?phone=${phone}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};

export const updateBookingAPI = (
  fullname: string,
  date: string,
  time: string,
  forAnother: boolean | undefined,
  remark: string,
  service: string,
  account: string | undefined,
  doctor: string,
  status: string
) => {
  const urlBackend = "/api/admin/update-booking/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    fullname,
    date,
    time,
    forAnother,
    remark,
    service,
    account,
    doctor,
    status,
  });
};

export const getResultAPI = (query: string) => {
  const urlBackend = `/api/admin/Get-result/?${query}`;
  return axios.get<IBackendRes<IModePaginate<IResult>>>(urlBackend);
};

export const createResultAPI = (
  account: string | undefined,
  date: string | undefined,
  time: string | undefined,
  title: string,
  decriptions: string,
  service: string | undefined,
  fullname: string | undefined,
  doctor: string | undefined
) => {
  const urlBackend = "/api/admin/create-result/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    account,
    date,
    time,
    title,
    decriptions,
    service,
    fullname,
    doctor,
  });
};

export const updateResultAPI = (
  id: number | undefined,
  account: string | undefined,
  decriptions: string | undefined
  // doctor: string | undefined
) => {
  const urlBackend = "/api/admin/update-result/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    id,
    account,
    decriptions,
  });
};

export const deleteResultAPI = (
  id: number | undefined,
  account: string | undefined
) => {
  const urlBackend = `/api/admin/delete-result/?id=${id}&account=${account}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};
