import { getServerSession } from "next-auth";
import DashboardUI from "./DashboardUI";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return <DashboardUI>{children}</DashboardUI>;
}
