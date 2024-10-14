import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import User from "../models/User";
import Investor from "../models/Investor";
import Admin from "../models/Admin";
import Company from "../models/Company";
import { handleAuthStateChanged } from "../services/authService";

type AuthUser = User | Investor | Company | Admin | null;

interface UserContextType {
  user: AuthUser;
  setUser: Dispatch<SetStateAction<AuthUser>>;
}

const AuthContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    const unsubscribe = handleAuthStateChanged(async (currentUser) => {
      if (currentUser && !user) {
        setUser(currentUser);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
