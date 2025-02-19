import axios from "services/axios.customize";

export const loginAPI = (phone: string, password: string) => {
  const urlBackend = "/api/accounts/Login/";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { phone, password });
};

export const registerAPI = async (
  fullname: string,
  phone: string,
  password: string
) => {
  const urlBackend = "/api/accounts/Register/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullname,
    phone,
    password,
  });
};

export const updateAPI = async (
  fullname: string,
  phone: string,
  birthDay: string,
  address: string,
  avatar: string
) => {
  const urlBackend = "/api/user/Update_user/";
  return axios.put<IBackendRes<ILogin>>(urlBackend, {
    fullname,
    phone,
    birthDay,
    address,
    avatar,
  });
};

export const changePasswordAPI = async (old_pass: string, new_pass: string) => {
  const urlBackend = "/api/change_password/";
  return axios.post<IBackendRes<IChangePassword>>(urlBackend, {
    old_pass,
    new_pass,
  });
};

export const fetchAccountAPI = () => {
  const urlBackend = "/api/accounts/User/";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend);
};

export const getAllDoctorAPI = () => {
  const urlBackend = "/api/user/Get_all_doctor/";
  return axios.get<IBackendRes<IDoctor[]>>(urlBackend);
};

export const getRandomDoctorAPI = (work: string) => {
  const urlBackend = `/api/user/Get_all_doctor/?work=${work}`;
  return axios.get<IBackendRes<IDoctor[]>>(urlBackend);
};

export const getListServicesAPI = () => {
  const urlBackend = "/api/Services/";
  return axios.get<IBackendRes<IModePaginate<IServices>>>(urlBackend);
};

export const getUsersAPI = (query: string) => {
  const urlBackend = `/api/admin/Get_all_users/?${query}`;
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
  const urlBackend = "/api/admin/Register_account/";
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
  const urlBackend = `/api/admin/Delete/?phone=${phone}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};

export const updateUserAPI = (
  phone: string,
  fullname: string,
  birthDay: string,
  address: string,
  role: string
) => {
  const urlBackend = "/api/admin/Update_user/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    phone,
    fullname,
    birthDay,
    address,
    role,
  });
};

export const getBookingAPI = (query: string) => {
  const urlBackend = `/api/admin/Get_booking/?${query}`;
  return axios.get<IBackendRes<IModePaginate<IBooking>>>(urlBackend);
};

export const getDoctorBookingAPI = (query: string) => {
  const urlBackend = `/api/doctor/Get_all_booking/?${query}`;
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
  doctor: string,
  Doctor_phone: string,
  status: string
) => {
  const urlBackend = "/api/admin/Register_booking/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullname,
    date,
    time,
    forAnother,
    remark,
    service,
    account,
    doctor,
    status,
    Doctor_phone,
  });
};

export const deleteBookingAPI = (phone: string | undefined) => {
  const urlBackend = `/api/admin/Delete_booking/?phone=${phone}`;
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
  Doctor_phone: string,
  status: string
) => {
  const urlBackend = "/api/admin/Update_booking/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    fullname,
    date,
    time,
    forAnother,
    remark,
    service,
    account,
    doctor,
    Doctor_phone,
    status,
  });
};

export const getResultAPI = (query: string) => {
  const urlBackend = `/api/admin/Get_all_result/?${query}`;
  return axios.get<IBackendRes<IModePaginate<IResult>>>(urlBackend);
};

export const getUserResultAPI = (account: string) => {
  const urlBackend = `/api/user/Get_result/?account=${account}`;
  return axios.get<IBackendRes<IModePaginate<IResult>>>(urlBackend);
};

export const getUserBookingAPI = () => {
  const urlBackend = `/api/user/Get_booking/`;
  return axios.get<IBackendRes<IBooking>>(urlBackend);
};

export const getDoctorResultAPI = (query: string) => {
  const urlBackend = `/api/doctor/Get_all_result/?${query}`;
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
  doctor: string | undefined,
  Doctor_phone: string | undefined
) => {
  const urlBackend = "/api/admin/Create_result/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    account,
    date,
    time,
    title,
    decriptions,
    service,
    fullname,
    doctor,
    Doctor_phone,
  });
};

export const updateResultAPI = (
  id: number | undefined,
  account: string | undefined,
  title: string | undefined,
  decriptions: string | undefined
  // doctor: string | undefined
) => {
  const urlBackend = "/api/admin/Update_result/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    id,
    account,
    title,
    decriptions,
  });
};

export const deleteResultAPI = (
  id: number | undefined,
  account: string | undefined
) => {
  const urlBackend = `/api/admin/Delete_result/?id=${id}&account=${account}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};

export const getTimeAPI = () => {
  const urlBackend = `/api/admin/Get_Table_working/`;
  return axios.get<IBackendRes<IModePaginate<ITime>>>(urlBackend);
};

export const getUserTimeAPI = () => {
  const urlBackend = `/api/user/Get_Table_working/`;
  return axios.get<IBackendRes<ITime[]>>(urlBackend);
};

export const createTimeAPI = (title: string, value: string) => {
  const urlBackend = "/api/admin/Create_Table_working/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    title,
    value,
  });
};

export const updateTimeAPI = (
  id: number | undefined,
  title: string | undefined,
  value: string | undefined
) => {
  const urlBackend = "/api/admin/Update_Table_working/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    id,
    title,
    value,
  });
};

export const deleteTimeAPI = (id: number | undefined) => {
  const urlBackend = `/api/admin/Delete_Table_working/?id=${id}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};

export const getAvatarAPI = () => {
  const urlBackend = `/api/admin/Get_Table_avatar/`;
  return axios.get<IBackendRes<IModePaginate<IAvatar>>>(urlBackend);
};

export const getUserAvatarAPI = () => {
  const urlBackend = `/api/user/Get_Table_avatar/`;
  return axios.get<IBackendRes<IAvatar[]>>(urlBackend);
};

export const createAvatarAPI = (name: string, Link: string) => {
  const urlBackend = "/api/admin/Create_Table_avatar/";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    name,
    Link,
  });
};

export const updateAvatarAPI = (
  id: number | undefined,
  name: string | undefined,
  link: string | undefined
) => {
  const urlBackend = "/api/admin/Update_Table_avatar/";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    id,
    name,
    link,
  });
};

export const deleteAvatarAPI = (id: number | undefined) => {
  const urlBackend = `/api/admin/Delete_Table_avatar/?id=${id}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};
