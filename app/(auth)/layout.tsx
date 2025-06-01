import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session?.accessToken) {
    redirect("/");
  }

  return <main className="flex items-center justify-center">{children}</main>;
};

export default AuthLayout;
