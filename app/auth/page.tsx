"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();

  async function handleClick() {
    const url = "http://localhost:8081/api/user";

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
    <div className="relative w-full h-screen bg-black">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
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
                  href="http://localhost:8080/realms/spring-boot-realm/protocol/openid-connect/registrations?client_id=spring-boot-app&redirect_uri=http://localhost:8081/login/oauth2/code/keycloak&response_type=code&scope=openid"
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
            <button onClick={() => signOut()}>Sign Out</button>
            <br />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
