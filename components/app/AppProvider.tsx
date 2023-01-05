import { createContext, ReactNode, useContext } from "react";
import AppManager from "../../lib/AppManager";

const AppContext = createContext<AppManager>(new AppManager());

const AppProvider = ({
  app,
  children,
}: {
  children: ReactNode;
  app: AppManager;
}) => {
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

const useApp: () => AppManager = () => {
  return useContext(AppContext);
};

export { AppProvider, useApp };
