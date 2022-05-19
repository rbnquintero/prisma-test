import { SPXSession } from "@prisma/client";

export type User = {
  username: string;
  password?: string;
  name: string;
  lastname: string;
  status: string;
  type: string;
  session?: SPXSession;
  videoToken?: string;
}