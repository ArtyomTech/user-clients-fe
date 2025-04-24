import { createContext } from "react";

export interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;

  username: string | null;
  setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export default UserContext;
