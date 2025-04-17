"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  async function handleClick() {
    const url = "http://localhost:8080/api/user/user-info";

    let headers = {};

    if (session) {
      headers = {
        Authorization: `Bearer ${session?.accessToken}`,
        "Access-Control-Allow-Origin": "http://localhost:3000",
      };
    } else {
      headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      };
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const product = await response.json();
      console.log("Product data:", product);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!session ? (
        <>
          <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
          <p className="text-lg mb-6">Please sign in to continue.</p>
          <button onClick={handleClick}>test</button>
          <button
            onClick={() => signIn("keycloak")}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
          <div className="mt-6">
            <p className="text-lg">
              New user?{" "}
              <Link
                href={`${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/login/oauth2/code/keycloak&response_type=code&scope=openid`}
                className="text-blue-400 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <p>Signed in as {session?.user?.name}</p>
          <button onClick={handleClick}>test</button>
          <br />
          <button
            onClick={() =>
              signOut({
                callbackUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
              })
            }
          >
            Sign Out
          </button>
          <br />
          <Link
            href={`${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?redirect_uri=http://localhost:3000/auth`}
            className=""
            onClick={() => {
              signOut();
            }}
          >
            Sign Out Fully
          </Link>
        </>
      )}
    </>
  );
};

export default Page;
