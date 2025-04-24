import { User } from "./user";

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  address: string;
  country: string;
  user: User;
}
