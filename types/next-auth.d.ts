// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the DefaultSession type to include any custom properties
   */
  interface Session extends DefaultSession {
    user?: {
      id: string;
      email: string;
      password: string;
      name: string;
      image: string;
      telepon: number;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    telepon: number;
  }
}
