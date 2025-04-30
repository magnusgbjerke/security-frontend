"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [state, setState] = useState("");

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  async function handleClick() {
    const url = "http://localhost:8080/api/user-info3";

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
      setState(JSON.stringify(product));
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

          <button
            onClick={() => signIn("keycloak")}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
          <br />
          <button
            onClick={handleClick}
            className="mt-4 mb-4 px-6 py-3 bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch from server
          </button>

          <p>
            Data from server: <br /> {state}
          </p>
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
          <button
            onClick={handleClick}
            className="mt-4 mb-4 px-6 py-3 bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch from server
          </button>
          <br />
          <p>
            Data from server: <br /> {state}
          </p>
          <br />
          <button
            onClick={() => signOut({ callbackUrl: "/auth" })}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Out
          </button>
        </>
      )}
    </>
  );
};

export default Page;
