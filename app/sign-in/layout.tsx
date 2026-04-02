import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Business Edge Portal",
  description: "Sign in with your FSID (demo — authentication not connected)",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
