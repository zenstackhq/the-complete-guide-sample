"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCreateUser } from "~/lib/hooks";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signup, error: signupError } = useCreateUser({
    onSuccess: async () => {
      // sign-up succeeded, sign in with the credentials
      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (signInResult?.ok) {
        window.location.href = "/";
      } else {
        console.error("Signin failed:", signInResult?.error);
      }
    },
  });

  const _err = signupError as { info?: { code?: string } };
  const errMsg = _err
    ? _err.info?.code === "P2002" // P2002 is the Prisma error code for unique constraint failure
      ? "Email already exists"
      : `Unexpected error occurred: ${JSON.stringify(_err)}`
    : "";

  function onSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signup({ data: { email, password } });
  }

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center">
      <div className="mb-10 flex items-center space-x-4">
        <h1 className="text-4xl">Welcome to Todo</h1>
      </div>
      <div className="flex w-full max-w-screen-sm items-center justify-center rounded-lg">
        <div className="w-full space-y-8 p-16">
          <h2 className="text-3xl font-bold">Create a Free Account</h2>
          <form className="mt-8 space-y-6" action="#" onSubmit={onSignup}>
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
              Already have an account?{" "}
              <Link href="/signin" className="text-primary">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
