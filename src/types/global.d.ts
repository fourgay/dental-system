export {};

declare global {
  interface IBackendRes<T> {
    message: string;
    data?: T;
  }

  interface IModePaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ILogin {
    access_token: string;
    user: IUser;
  }

  interface IRegister {
    fullname: string;
    phone: string;
    password: string;
  }

  interface IUser {
    id: string;
    fullname: string;
    phone: string;
    role: string;
    avatar: string;
  }

  interface IFetchAccount {
    user: IUser;
  }

  interface IDoctor {
    fullname: string;
    work: string;
    img: string;
  }

  interface IServices {
    id: number;
    name: string;
    title: string;
    detail: string;
    img: string;
  }
}
