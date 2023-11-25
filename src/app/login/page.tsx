"use client";

import * as React from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import * as FirestoreService from "@/services/firestore";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface PasswordFormValue {
  email: string;
  password: string;
}
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLoginWithEmailAndPassword({
    email,
    password,
  }: PasswordFormValue) {
    const credential = await signInWithEmailAndPassword(
      FirestoreService.auth,
      email,
      password
    );
    const idTokenResult = await credential.user.getIdTokenResult();
    console.log(idTokenResult.token);
    // Sets authenticated cookies
    await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idTokenResult.token}`,
      },
    }).then(() => {
      router.push("/");
    });
  }

  async function handleLogout() {
    await signOut(FirestoreService.auth);
    // Removes authenticated cookies
    await fetch("/api/logout", {
      method: "GET",
    });
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-visible bg-primary relative max-w-screen-lg mx-auto flex-auto text-dark">
      <h1 className="mt-2 mb-6 animate-fade-rotate-in-lg  text-center text-3xl font-semibold tracking-tight  sm:my-8">
        Sign In
      </h1>
      <div className=" bg-sky-800  shadow-lg shadow-stone-600/[0.03] dark:shadow-none w-full animate-fade-in rounded-3xl p-6  animation-delay-150 sm:w-96 sm:p-10">
        <form>
          <div className="z-10 ">
            <div className="flex flex-row pt-1 mt-5">
              <div className="flex-grow">
                <div className="mb-2">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-password"
                      type="password"
                      placeholder="******************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <a
                    className="cursor-pointer select-none flex font-medium shadow-sm  !shadow-orange-300/10 outline-none transition duration-200 hover:shadow-lg hover:shadow-stone-600/10 dark:shadow-none bg-primary bg-opacity-80 hover:bg-opacity-70 dark:bg-opacity-90 dark:text-stone-800 h-10 rounded-xl px-4 text-base group w-full"
                    onClick={() =>
                      handleLoginWithEmailAndPassword({
                        email: username,
                        password: password,
                      })
                    }
                  >
                    <span className="flex-1 flex h-full w-full items-center justify-center whitespace-nowrap">
                      Login
                    </span>
                  </a>
                  <a
                    className="cursor-pointer select-none flex font-medium shadow-sm my-4  !shadow-orange-300/10 outline-none transition duration-200 hover:shadow-lg hover:shadow-stone-600/10 dark:shadow-none bg-primary bg-opacity-80 hover:bg-opacity-70 dark:bg-opacity-90 dark:text-stone-800 h-10 rounded-xl px-4 text-base group w-full"
                    onClick={async () => {
                      handleLogout();
                    }}
                  >
                    <span className="flex-1 flex h-full w-full items-center justify-center whitespace-nowrap">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
