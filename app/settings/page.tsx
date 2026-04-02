"use client";

/**
 * Settings UI (demo). Persists visibility + LinkedIn + open-to-contact in localStorage.
 *
 * Future: replace with Supabase — update contact_emails.privacy, contact_phones.privacy,
 * locations.privacy, experience.privacy per row; people.open_to_contact; scraper_profiles.linkedin_url;
 * use Supabase Auth `updateUser` for password changes server-side.
 */
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe2, Lock, Shield, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_VISIBILITY,
  PRIVACY_TIER_LABELS,
  PROFILE_VISIBILITY_ASPECTS,
  type PrivacyTier,
  type ProfileVisibilityAspectId,
} from "@/lib/profile-visibility";

const STORAGE_KEY = "be-portal-demo-settings-v1";

type DemoSettings = {
  visibility: Record<ProfileVisibilityAspectId, PrivacyTier>;
  linkedinUrl: string;
  openToContact: boolean;
};

function loadDemoSettings(): DemoSettings {
  if (typeof window === "undefined") {
    return {
      visibility: { ...DEFAULT_VISIBILITY },
      linkedinUrl: "",
      openToContact: true,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        visibility: { ...DEFAULT_VISIBILITY },
        linkedinUrl: "",
        openToContact: true,
      };
    }
    const parsed = JSON.parse(raw) as Partial<DemoSettings>;
    const visibility = { ...DEFAULT_VISIBILITY, ...parsed.visibility } as Record<
      ProfileVisibilityAspectId,
      PrivacyTier
    >;
    return {
      visibility,
      linkedinUrl: typeof parsed.linkedinUrl === "string" ? parsed.linkedinUrl : "",
      openToContact: parsed.openToContact !== false,
    };
  } catch {
    return {
      visibility: { ...DEFAULT_VISIBILITY },
      linkedinUrl: "",
      openToContact: true,
    };
  }
}

function persistDemoSettings(data: DemoSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota / private mode
  }
}

export default function SettingsPage() {
  const [mounted, setMounted] = React.useState(false);
  const [visibility, setVisibility] = React.useState<
    Record<ProfileVisibilityAspectId, PrivacyTier>
  >(() => ({ ...DEFAULT_VISIBILITY }));
  const [linkedinUrl, setLinkedinUrl] = React.useState("");
  const [openToContact, setOpenToContact] = React.useState(true);

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    const s = loadDemoSettings();
    setVisibility(s.visibility);
    setLinkedinUrl(s.linkedinUrl);
    setOpenToContact(s.openToContact);
    setMounted(true);
  }, []);

  const savePrivacy = () => {
    persistDemoSettings({ visibility, linkedinUrl, openToContact });
    toast.success("Privacy settings saved locally (demo). Sync to Supabase when connected.");
  };

  const saveProfileFields = () => {
    persistDemoSettings({ visibility, linkedinUrl, openToContact });
    toast.success("Profile updated locally (demo). Persist to scraper_profiles.linkedin_url later.");
  };

  const persistOpenToContact = (checked: boolean) => {
    setOpenToContact(checked);
    persistDemoSettings({ visibility, linkedinUrl, openToContact: checked });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Use at least 8 characters for your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    // Future: supabase.auth.updateUser({ password: newPassword }) from a server action
    toast.info("Password change not sent — connect Supabase Auth and call updateUser on the server.");
    setNewPassword("");
    setConfirmPassword("");
  };

  const setTier = (id: ProfileVisibilityAspectId, value: PrivacyTier) => {
    setVisibility((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#a60021] px-2 py-1.5 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to directory
          </Link>
          <Separator orientation="vertical" className="h-6 bg-gray-200" />
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative h-8 w-28 shrink-0">
              <Image
                src="/logo.png"
                alt=""
                fill
                className="object-contain object-left"
                sizes="112px"
              />
            </div>
            <h1 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
              Settings
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-8 text-sm text-gray-600 leading-relaxed">
          Control who can see each part of your alumni profile. Visibility levels match the{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">privacy_tier</code>{" "}
          enum in your database: all members, your chapter only, or hidden.
        </p>

        <div className="flex flex-col gap-8">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a60021]/10 text-[#a60021]">
                  <Shield className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">Profile visibility</CardTitle>
                  <CardDescription className="text-gray-600">
                    Choose a visibility level for each field. Others only see what their access
                    allows.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              <div
                className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-100 bg-white"
                role="region"
                aria-label="Per-field visibility"
              >
                {PROFILE_VISIBILITY_ASPECTS.map((aspect) => (
                  <div
                    key={aspect.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-sm font-medium text-gray-900">{aspect.label}</p>
                      <p className="text-xs text-gray-500 leading-snug">{aspect.description}</p>
                    </div>
                    <div className="w-full shrink-0 sm:max-w-[280px]">
                      <label className="sr-only" htmlFor={`visibility-${aspect.id}`}>
                        Visibility for {aspect.label}
                      </label>
                      <Select
                        value={mounted ? visibility[aspect.id] : DEFAULT_VISIBILITY[aspect.id]}
                        onValueChange={(v) => setTier(aspect.id, v as PrivacyTier)}
                      >
                        <SelectTrigger
                          id={`visibility-${aspect.id}`}
                          className="w-full bg-white border-gray-200 shadow-xs"
                          size="default"
                        >
                          <SelectValue placeholder="Choose visibility" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          {(Object.keys(PRIVACY_TIER_LABELS) as PrivacyTier[]).map((tier) => (
                            <SelectItem key={tier} value={tier}>
                              {PRIVACY_TIER_LABELS[tier]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                Backend mapping is documented in code comments on each aspect (
                <span className="font-mono text-[11px]">lib/profile-visibility.ts</span>) and in{" "}
                <span className="font-mono text-[11px]">supabase/schema.sql</span> (
                <span className="font-mono text-[11px]">privacy_tier</span> on emails, phones,
                location, experience rows).
              </p>
              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  onClick={savePrivacy}
                  className="bg-[#a60021] hover:bg-[#8a001a]"
                >
                  Save privacy settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a60021]/10 text-[#a60021]">
                  <UserCircle className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">Contact preferences</CardTitle>
                  <CardDescription className="text-gray-600">
                    Let members know if you are open to outreach (stored on{" "}
                    <span className="font-mono text-xs">people.open_to_contact</span>).
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-100 bg-white p-4">
                <Checkbox
                  checked={openToContact}
                  onCheckedChange={(c) => persistOpenToContact(c === true)}
                  className="mt-0.5"
                  aria-describedby="open-to-contact-desc"
                />
                <span className="space-y-1">
                  <span className="text-sm font-medium text-gray-900">Open to being contacted</span>
                  <span id="open-to-contact-desc" className="block text-xs text-gray-500">
                    When enabled, eligible members may see contact options based on your field-level
                    visibility above.
                  </span>
                </span>
              </label>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a60021]/10 text-[#a60021]">
                  <Globe2 className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">LinkedIn</CardTitle>
                  <CardDescription className="text-gray-600">
                    Used for enrichment and shown when your link visibility allows (
                    <span className="font-mono text-xs">scraper_profiles.linkedin_url</span>).
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="linkedin-url" className="text-sm font-medium text-gray-900">
                  Profile URL
                </label>
                <Input
                  id="linkedin-url"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="bg-white border-gray-200"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={saveProfileFields}
                  variant="outline"
                  className="border-gray-200"
                >
                  Save LinkedIn URL
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a60021]/10 text-[#a60021]">
                  <Lock className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">Password</CardTitle>
                  <CardDescription className="text-gray-600">
                    Update the password for your account. Must be performed through Supabase Auth in
                    production.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium text-gray-900">
                    New password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium text-gray-900">
                    Confirm new password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white border-gray-200"
                  />
                </div>
                <Button type="submit" variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Update password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
