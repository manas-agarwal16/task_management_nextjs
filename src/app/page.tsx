import React from "react";
import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default async function Home() {
  const session = await auth();
  console.log("session : ", session);

  if (session && session?.user) {
    const user = session.user;
    console.log("User is logged in");
    redirect(`/tasks/${user.email}`);
  }

  return (
    <>
      <h1 className="absolute my-5 text-3xl md:text-4xl lg:text-5xl w-full text-center font-semibold mb-4 text-blue-400">
        Task Management
      </h1>
      <main className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
        <form
          className="border border-blue-500 rounded-lg"
          action={async () => {
            "use server";
            await signIn("google"); //server action
          }}
        >
          <button className="flex gap-2 px-4 py-2" type="submit">
            <FcGoogle size={24} />
            <span className="">Sign in with Google</span>
          </button>
        </form>

        <form
          className="border rounded-lg"
          action={async () => {
            "use server";
            await signIn("github"); //server action
          }}
        >
          <button className="flex gap-2 px-4 py-2" type="submit">
            <FaGithub size={24} />
            <span className="">Sign in with Github</span>
          </button>
        </form>
      </main>
    </>
  );
}
