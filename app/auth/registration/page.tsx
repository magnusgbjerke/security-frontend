"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const activateSession = async () => {
      await signIn("keycloak", {
        redirect: false,
        callbackUrl: "/auth",
      });
    };
    activateSession();
  }, []);

  return <div>Redirecting...</div>;
};

export default Page;
