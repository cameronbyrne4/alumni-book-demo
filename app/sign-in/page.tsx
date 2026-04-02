"use client";

/**
 * FSID sign-in screen (demo UI only).
 *
 * Future backend integration (when DB / auth are wired):
 * - Validate email/username + password against your IdP or FSID broker (OIDC/SAML),
 *   or delegate to Supabase Auth with a custom provider if that is the chosen path.
 * - Never trust client-only checks; run credential verification on the server (Route Handler
 *   or Server Action) and set an HTTP-only session cookie or return a short-lived token.
 * - Rate-limit and audit failed attempts; consider CAPTCHA after repeated failures.
 * - Map the authenticated identity to `profiles` / alumni rows once users exist in the DB.
 */
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Demo: no network call — replace with server action / API route that performs FSID auth.
    toast.info("FSID sign-in is not connected yet. Wire this form to your auth service.");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 py-12">
      <Card className="w-full max-w-md border-gray-200 shadow-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center px-2 pt-1">
            <Image
              src="/logo.png"
              alt="Business Edge Portal — A Commonwealth Leadership"
              width={400}
              height={160}
              className="h-auto w-full max-w-[min(100%,360px)] object-contain"
              priority
            />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">Sign in</CardTitle>
            <CardDescription className="text-gray-600">
              Use your email or username and password. FSID authentication will be enabled when
              the backend is connected.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="sign-in-identifier" className="text-sm font-medium text-gray-900">
                Email or username
              </label>
              <Input
                id="sign-in-identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                placeholder="you@organization.edu"
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sign-in-password" className="text-sm font-medium text-gray-900">
                Password
              </label>
              <Input
                id="sign-in-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className="bg-white"
              />
            </div>
            <Button type="submit" className="w-full bg-[#a60021] hover:bg-[#8a001a]">
              Sign in with FSID
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="font-medium text-[#a60021] underline-offset-4 hover:underline">
              Back to alumni directory
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
