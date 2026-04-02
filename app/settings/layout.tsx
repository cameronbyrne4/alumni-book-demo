import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Business Edge Portal",
  description: "Privacy, profile, and account settings",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
