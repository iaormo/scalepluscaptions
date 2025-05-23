
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { syncContactToHighLevel } from "../services/highLevel";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  register: (email: string, phone: string, username: string, password: string, businessName: string, businessType: string, businessDescription: string) => Promise<boolean>;
  logout: () => void;
}

interface UserCredential {
  username: string;
  password: string;
  userData: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] = useState<UserCredential[]>([]);

  useEffect(() => {
    // Check local storage for existing user data and credentials
    const storedUser = localStorage.getItem("user");
    const storedCredentials = localStorage.getItem("userCredentials");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user");
      }
    }

    if (storedCredentials) {
      try {
        setUserCredentials(JSON.parse(storedCredentials));
      } catch (error) {
        console.error("Failed to parse stored user credentials:", error);
        localStorage.removeItem("userCredentials");
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    const credential = userCredentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (credential) {
      setUser(credential.userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(credential.userData));
      return true;
    }
    return false;
  };

  const register = async (
    email: string,
    phone: string,
    username: string,
    password: string,
    businessName: string,
    businessType: string,
    businessDescription: string
  ) => {
    // Check if username already exists
    const usernameExists = userCredentials.some(
      (cred) => cred.username === username
    );

    if (usernameExists) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      phone,
      username,
      businessName,
      businessType,
      businessDescription,
    };

    // Create new user credential
    const newCredential: UserCredential = {
      username,
      password,
      userData: newUser,
    };

    // Update state and local storage
    setUser(newUser);
    setIsAuthenticated(true);
    setUserCredentials([...userCredentials, newCredential]);
    
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem(
      "userCredentials",
      JSON.stringify([...userCredentials, newCredential])
    );

    // Sync contact to High Level
    try {
      const nameParts = businessName.split(' ');
      const firstName = nameParts[0] || businessName;
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      await syncContactToHighLevel({
        email,
        phone,
        firstName,
        lastName,
        businessName,
        businessTypeId: businessType,
        businessDescription
      });
    } catch (error) {
      console.error("Failed to sync contact to High Level:", error);
      // Don't fail registration if High Level sync fails
    }

    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
