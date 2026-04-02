/**
 * Profile visibility tiers — mirrors `privacy_tier` in supabase/schema.sql:
 *   'public' | 'chapter' | 'private'
 *
 * RLS today enforces this on contact_emails, contact_phones, locations, experience.
 * Education is visible to all members in the schema until/unless a privacy column is added.
 */
export type PrivacyTier = "public" | "chapter" | "private";

export const PRIVACY_TIER_LABELS: Record<PrivacyTier, string> = {
  public: "All members (any chapter)",
  chapter: "My chapter only",
  private: "Only me",
};

/** One row per “aspect” of the directory profile; maps conceptually to tables/columns in schema.sql */
export const PROFILE_VISIBILITY_ASPECTS = [
  {
    id: "display_name",
    label: "Name",
    description: "First and last name as shown in the directory.",
    schemaHint:
      "people.first_name, last_name, preferred_name — add per-field or row-level visibility if product requires it.",
  },
  {
    id: "profile_photo",
    label: "Profile photo",
    description: "Avatar image on your card and profile.",
    schemaHint: "people.avatar_url",
  },
  {
    id: "chapter_and_class",
    label: "Chapter & class year",
    description: "Fraternity chapter and pledge class.",
    schemaHint: "chapter_memberships + chapters (display layer may need a visibility flag).",
  },
  {
    id: "location",
    label: "Location",
    description: "City, state, and region.",
    schemaHint: "locations.privacy",
  },
  {
    id: "current_job",
    label: "Current role & company",
    description: "Your present title and employer.",
    schemaHint: "experience.privacy where is_current (current job row).",
  },
  {
    id: "email",
    label: "Email address",
    description: "Primary email shown to others when permitted.",
    schemaHint: "contact_emails.privacy (per email row).",
  },
  {
    id: "phone",
    label: "Phone number",
    description: "Primary phone for contact.",
    schemaHint: "contact_phones.privacy (per phone row).",
  },
  {
    id: "education",
    label: "Education",
    description: "Schools, degrees, and graduation year.",
    schemaHint:
      "education — RLS currently allows all members to SELECT; add privacy_tier to education if you need per-user hiding.",
  },
  {
    id: "work_history",
    label: "Past work experience",
    description: "Previous roles and employers (not your current job).",
    schemaHint: "experience.privacy on non-current rows.",
  },
  {
    id: "linkedin",
    label: "LinkedIn profile link",
    description: "Link to your public LinkedIn profile.",
    schemaHint:
      "scraper_profiles.linkedin_url — visibility column may be added; today alumni can SELECT own row only.",
  },
] as const;

export type ProfileVisibilityAspectId = (typeof PROFILE_VISIBILITY_ASPECTS)[number]["id"];

/** Sensible demo defaults aligned with schema defaults where they exist */
export const DEFAULT_VISIBILITY: Record<ProfileVisibilityAspectId, PrivacyTier> = {
  display_name: "public",
  profile_photo: "public",
  chapter_and_class: "chapter",
  location: "public",
  current_job: "public",
  email: "chapter",
  phone: "chapter",
  education: "public",
  work_history: "public",
  linkedin: "chapter",
};
