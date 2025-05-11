"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [state, setState] = useState("");

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
              <button
                onClick={async () => {
                  window.location.href =
                    `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations` +
                    `?client_id=${encodeURIComponent(process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!)}` +
                    `&redirect_uri=${encodeURIComponent("http://localhost:3000/auth/registration")}` +
                    `&response_type=code` +
                    `&scope=openid`;
                }}
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create an account
              </button>
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
            onClick={async () => {
              window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=http://localhost:3000/auth/signout`;
            }}
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
