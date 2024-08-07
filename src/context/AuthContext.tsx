import { useRouter } from "next/navigation";
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
}

const AuthenticationContext = createContext<
  AuthenticationContextValue | undefined
>(undefined);

export const AuthProvider = ({ children }: AuthenticationContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const checkSessionAndError = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    console.log("user", user);
    return user && !error;
  };

  const checkSession = async () => {
    try {
      const authenticated = await checkSessionAndError();
      if (authenticated) {
        setIsAuthenticated(true);
        router.replace("/myShop");
      } else {
        setIsAuthenticated(false);
        router.replace("/");
        setLoading(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      toast.error("An Error Occurred.PLease check your connection");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const contextValue: AuthenticationContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
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
