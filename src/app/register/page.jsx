"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Context } from "@/hooks/UserContext";

const Register = () => {
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "register";
  const { setUser } = useContext(Context);
  const [error, setError] = useState(null);

  const submitHandler = async ({ user, password, cpassword }) => {
    if (password !== cpassword) {
      return setError("Passwords dont match");
    }

    try {
      const { data } = await axios.post(baseURL, { user, password });

      setUser(data);
      router.push("/home");
    } catch (error) {
      console.log(error);
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
                cpassword: e.target.cpassword.value,
              });
            }}
          >
            <input
              type="text"
              id="user"
              name="user"
              // onChange={(e) => setFullName(e.target.value.toString())}
              className="border mb-3 rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
              placeholder="Username"
            />
            <input
              type="password"
              id="password"
              name="password"
              // onChange={(e) => setFullName(e.target.value.toString())}
              className="border mb-3 rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
              placeholder="Password"
            />
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              // onChange={(e) => setFullName(e.target.value.toString())}
              className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              className="w-full px-4 mt-2 py-2 rounded-md bg-gradient-to-r mb-4 from-green-300 via-blue-500 to-purple-600 "
            >
              Sign Up
            </button>
          </form>
          <Link
            href={"/"}
            className="text-xs cursor-pointer hover:text-white/50 duration-150 text-white/80"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
