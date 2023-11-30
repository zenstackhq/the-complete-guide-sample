"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function onSignin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const signInResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (signInResult?.ok) {
      window.location.href = "/";
    } else {
      setErrMsg(`Signin failed. Please check your email and password.`);
    }
  }

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center">
      <div className="mb-10 flex items-center space-x-4">
        <h1 className="text-4xl">Welcome to Todo</h1>
      </div>
      <div className="flex w-full max-w-screen-sm items-center justify-center rounded-lg">
        <div className="w-full space-y-8 p-16">
          <h2 className="text-3xl font-bold">Sign in to your account</h2>
          <form className="mt-8 space-y-6" action="#" onSubmit={onSignin}>
            <div>
              <label htmlFor="email" className="label">
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                Your password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
            </div>

            {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}

            <button className="btn btn-primary mt-4" type="submit">
              Create account
            </button>
            <div>
              Not registered?{" "}
              <Link href="/signup" className="text-primary">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
