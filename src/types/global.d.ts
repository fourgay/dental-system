export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
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
    results: T[];
  }

  interface ILogin {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      fullname: string;
      phone: string;
      avatar: string;
    };
  }

  interface IRegister {
    fullname: string;
    phone: string;
    password: string;
  }

  interface IUser {
    email: string;
    phone: string;
    fullname: string;
    role: string;
    avatar: string;
    id: string;
  }
}

{
  "errors": {
      "phone": ["This field must be unique."]
  }
}