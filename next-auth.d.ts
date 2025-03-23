// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    id_token?: string;
    error?: string;
  }

  interface User {
    access_token?: string;
    id_token?: string;
  }
}
