import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  return <div>{children}</div>;
}
