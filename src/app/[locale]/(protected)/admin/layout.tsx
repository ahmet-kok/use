import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { setRequestLocale } from "next-intl/server";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function Dashboard({ children, params }: ProtectedLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const user = await getCurrentUser();
  if (!user || user.role as string !== "ADMIN") redirect("/login");

  return <>{children}</>;
}
