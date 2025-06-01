import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.accessToken) {
    redirect("/sign-in");
  }

  return <>{children}</>;
};

export default Layout;
