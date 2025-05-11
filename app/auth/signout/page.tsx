"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const activateSession = async () => {
      await signOut({ redirect: false });
    };
    activateSession();
    router.push("/auth");
  }, []);

  return <div>Redirecting...</div>;
};

export default Page;
