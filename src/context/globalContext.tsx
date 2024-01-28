"use client";
import { logout } from "@/actions/logout";
import { tryGetUser } from "@/actions/tryGetUser";
import { User } from "@/models/user";
import React, {
  createContext,
  useContext,
  useState,
  FunctionComponent,
  useEffect
} from "react";

interface GlobalContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutCleanup: () => Promise<void>;
  userData: User | null;
  userDataLoaded: boolean;
  loadUserData: () => void;
  updateUserData: (data: User) => void;
}
interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

const USERDATA_TTL = 60 * 5;

export const GlobalProvider: FunctionComponent<GlobalProviderProps> = ({
  children
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

  const logoutCleanup = async () => {
    await logout();
    setUserData(null);
    setUserDataLoaded(false);
  };

  const loadUserData = () => {
    setUserDataLoaded(false);
    setIsLoading(true);
    tryGetUser().then((value) => {
      if (value) {
        setUserData(value);
        setUserDataLoaded(true);
      }
      setIsLoading(false);
    });
  };

  const updateUserData = (input: User) => {
    setUserData({ ...input });
    setUserDataLoaded(true);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        logoutCleanup,
        userData,
        userDataLoaded,
        loadUserData,
        updateUserData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Missing global context!");
  return context;
};
