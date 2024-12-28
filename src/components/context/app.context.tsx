import { Spin } from "antd";
import { createContext, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  user: IUser | null;
  setUser: (v: IUser) => void;
  isAppLoading: boolean;
  setIsAppLoading: (v: boolean) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(false);

  return (
    <CurrentAppContext.Provider
      value={{
        isAuthenticated,
        user,
        isAppLoading,
        setIsAuthenticated,
        setUser,
        setIsAppLoading,
      }}
    >
      {props.children}
      <Spin tip="Loading..." fullscreen spinning={isAppLoading} size="large" />
    </CurrentAppContext.Provider>
  );
};

export const userCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error("useCurrentApp has to be used within");
  }

  return currentAppContext;
};
