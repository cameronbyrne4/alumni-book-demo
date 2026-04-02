"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

const STORAGE_KEY = "be-portal-demo-settings-v1";

const NAV = [
  { id: "visibility" as const, label: "Profile visibility" },
  { id: "contact" as const, label: "Contact preferences" },
  { id: "linkedin" as const, label: "LinkedIn" },
  { id: "password" as const, label: "Password" },
];

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
    // ignore
  }
}

function NavLink({
  href,
  children,
  isActive,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "block rounded-xl px-3 py-2.5 text-[15px] leading-snug transition-colors",
        isActive
          ? "bg-gray-100 font-semibold text-gray-900"
          : "font-normal text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      {children}
    </a>
  );
}

export default function SettingsPage() {
  const [mounted, setMounted] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("visibility");
  const [visibility, setVisibility] = React.useState<
    Record<ProfileVisibilityAspectId, PrivacyTier>
  >(() => ({ ...DEFAULT_VISIBILITY }));
  const [linkedinUrl, setLinkedinUrl] = React.useState("");
  const [openToContact, setOpenToContact] = React.useState(true);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});

  React.useEffect(() => {
    const s = loadDemoSettings();
    setVisibility(s.visibility);
    setLinkedinUrl(s.linkedinUrl);
    setOpenToContact(s.openToContact);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const nodes = sectionRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );
    NAV.forEach(({ id }) => {
      const el = nodes[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [mounted]);

  const savePrivacy = () => {
    persistDemoSettings({ visibility, linkedinUrl, openToContact });
    toast.success("Saved.");
  };

  const saveProfileFields = () => {
    persistDemoSettings({ visibility, linkedinUrl, openToContact });
    toast.success("Saved.");
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
    toast.info("Password updates are not available in this preview.");
    setNewPassword("");
    setConfirmPassword("");
  };

  const setTier = (id: ProfileVisibilityAspectId, value: PrivacyTier) => {
    setVisibility((prev) => ({ ...prev, [id]: value }));
  };

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const inputClass =
    "h-11 rounded-xl border-gray-200 bg-white text-[15px] shadow-none transition-colors focus-visible:border-[#a60021]/40 focus-visible:ring-[#a60021]/20";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#a60021] px-2 py-1.5 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Back
          </Link>
          <Separator orientation="vertical" className="h-6 bg-gray-200" />
          <div className="relative h-8 w-28 shrink-0">
            <Image
              src="/logo.png"
              alt=""
              fill
              className="object-contain object-left"
              sizes="112px"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
          {/* Mobile: horizontal nav */}
          <nav
            className="flex gap-1 overflow-x-auto pb-1 lg:hidden -mx-1 px-1"
            aria-label="Settings sections"
          >
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                  activeSection === id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop sidebar */}
          <aside className="hidden w-[220px] shrink-0 lg:block">
            <div className="sticky top-24 space-y-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
              <nav className="space-y-0.5" aria-label="Settings sections">
                {NAV.map(({ id, label }) => (
                  <NavLink
                    key={id}
                    href={`#${id}`}
                    isActive={activeSection === id}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(id);
                    }}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1 max-w-xl">
            {/* Profile visibility */}
            <section
              id="visibility"
              ref={setSectionRef("visibility")}
              className="scroll-mt-28 pb-16 md:scroll-mt-24 md:pb-24"
            >
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Profile visibility</h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-gray-500">
                Choose who can see each part of your profile. You can use different levels for
                different information.
              </p>

              <div className="mt-10 space-y-0" role="region" aria-label="Per-field visibility">
                {PROFILE_VISIBILITY_ASPECTS.map((aspect, index) => (
                  <div
                    key={aspect.id}
                    className={cn(
                      "flex flex-col gap-4 py-8 first:pt-0 sm:flex-row sm:items-start sm:justify-between sm:gap-10",
                      index < PROFILE_VISIBILITY_ASPECTS.length - 1 && "border-b border-gray-200/80"
                    )}
                  >
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <p className="text-[15px] font-semibold text-gray-900">{aspect.label}</p>
                      <p className="text-sm leading-relaxed text-gray-500">{aspect.description}</p>
                    </div>
                    <div className="w-full shrink-0 sm:max-w-[min(100%,280px)]">
                      <label className="sr-only" htmlFor={`visibility-${aspect.id}`}>
                        Visibility for {aspect.label}
                      </label>
                      <Select
                        value={mounted ? visibility[aspect.id] : DEFAULT_VISIBILITY[aspect.id]}
                        onValueChange={(v) => setTier(aspect.id, v as PrivacyTier)}
                      >
                        <SelectTrigger
                          id={`visibility-${aspect.id}`}
                          className={cn(inputClass, "w-full")}
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

              <div className="mt-10">
                <Button
                  type="button"
                  onClick={savePrivacy}
                  className="h-11 rounded-xl bg-[#a60021] px-6 text-[15px] font-semibold hover:bg-[#8a001a]"
                >
                  Save
                </Button>
              </div>
            </section>

            {/* Contact preferences */}
            <section
              id="contact"
              ref={setSectionRef("contact")}
              className="scroll-mt-28 pt-20 pb-16 md:scroll-mt-24 md:pt-28 md:pb-24"
            >
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Contact preferences</h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-gray-500">
                Control whether other members can reach out to you through the directory.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="min-w-0 space-y-1.5">
                  <p className="text-[15px] font-semibold text-gray-900">Open to being contacted</p>
                  <p id="open-to-contact-desc" className="text-sm leading-relaxed text-gray-500">
                    When on, members you allow through your visibility settings can see ways to
                    contact you.
                  </p>
                </div>
                <div className="flex shrink-0 justify-end sm:pt-1">
                  <Checkbox
                    checked={openToContact}
                    onCheckedChange={(c) => persistOpenToContact(c === true)}
                    className="size-5 rounded-md"
                    aria-describedby="open-to-contact-desc"
                  />
                </div>
              </div>
            </section>

            {/* LinkedIn */}
            <section
              id="linkedin"
              ref={setSectionRef("linkedin")}
              className="scroll-mt-28 pt-20 pb-16 md:scroll-mt-24 md:pt-28 md:pb-24"
            >
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">LinkedIn</h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-gray-500">
                Add your public profile link. It will be shown according to your visibility setting
                for LinkedIn above.
              </p>

              <div className="mt-10 space-y-3">
                <label htmlFor="linkedin-url" className="text-[15px] font-semibold text-gray-900">
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
                  className={inputClass}
                />
              </div>

              <div className="mt-8">
                <Button
                  type="button"
                  onClick={saveProfileFields}
                  variant="outline"
                  className="h-11 rounded-xl border-gray-200 bg-white px-6 text-[15px] font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Save
                </Button>
              </div>
            </section>

            {/* Password */}
            <section
              id="password"
              ref={setSectionRef("password")}
              className="scroll-mt-28 pt-20 pb-8 md:scroll-mt-24 md:pt-28"
            >
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Password</h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-gray-500">
                Choose a strong password you don&apos;t use elsewhere.
              </p>

              <form onSubmit={handlePasswordSubmit} className="mt-10 max-w-md space-y-8">
                <div className="space-y-3">
                  <label htmlFor="new-password" className="text-[15px] font-semibold text-gray-900">
                    New password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-3">
                  <label
                    htmlFor="confirm-password"
                    className="text-[15px] font-semibold text-gray-900"
                  >
                    Confirm new password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <Button
                  type="submit"
                  className="h-11 rounded-xl bg-gray-900 px-6 text-[15px] font-semibold text-white hover:bg-gray-800"
                >
                  Update password
                </Button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
