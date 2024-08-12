"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Context } from "@/hooks/UserContext";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "login";
  const { setUser } = useContext(Context);
  const [error, setError] = useState(null);

  const submitHandler = async ({ user, password }) => {
    try {
      const { data } = await axios.post(baseURL, { user, password });

      setUser(data);
      router.push("/home");
    } catch (error) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  return (
    <section className="bg-gray-950 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 flex-col gap-24 flex h-screen items-center">
        <Image src="/logo.svg" alt="logo" width={200} height={200} />
        <div className="mx-auto max-w-sm text-center ">
          {error && (
            <span className="text-red-600 text-xs mb-2 font-bold">{error}</span>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler({
                user: e.target.user.value,
                password: e.target.password.value,
              });
            }}
          >
            <input
              type="text"
              id="user"
              name="user"
              className="border mb-3 rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
              placeholder="Enter your username"
            />
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              className="w-full px-4 mt-2 py-2 rounded-md bg-gradient-to-r mb-4 from-green-300 via-blue-500 to-purple-600 "
            >
              Login
            </button>
          </form>
          <Link
            href={"/register"}
            className="text-xs cursor-pointer hover:text-white/50 duration-150 text-white/80"
          >
            Dont have an account? Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
