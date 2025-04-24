import { Client } from "./client";

export interface User {
  id: number;
  username: string;
  password: string;
  clients: Client[];
}
