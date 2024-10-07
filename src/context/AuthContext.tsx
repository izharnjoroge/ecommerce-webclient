import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import supabase from "../config/client";
import { toast } from "react-toastify";

interface AuthenticationContextProps {
  children: ReactNode;
}

interface AuthenticationContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkSession: () => Promise<void>;
}

const AuthenticationContext = createContext<
  AuthenticationContextValue | undefined
>(undefined);

export const AuthProvider = ({ children }: AuthenticationContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSessionAndError = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return user && !error;
  };

  const checkSession = async () => {
    try {
      const authenticated = await checkSessionAndError();
      if (authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      toast.error("An Error Occurred.PLease check your connection");
    }
    setLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  const contextValue: AuthenticationContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    checkSession,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuthContext() {
  const authContext = useContext(AuthenticationContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext must be used within an AuthenticationContextProvider"
    );
  }

  return authContext;
}
