export type PrivacyTier = "public" | "chapter" | "private";

export const PRIVACY_TIER_LABELS: Record<PrivacyTier, string> = {
  public: "All members (any chapter)",
  chapter: "My chapter only",
  private: "Only me",
};

export const PROFILE_VISIBILITY_ASPECTS = [
  {
    id: "display_name",
    label: "Name",
    description: "First and last name as shown in the directory.",
  },
  {
    id: "profile_photo",
    label: "Profile photo",
    description: "Avatar image on your card and profile.",
  },
  {
    id: "chapter_and_class",
    label: "Chapter & class year",
    description: "Fraternity chapter and pledge class.",
  },
  {
    id: "location",
    label: "Location",
    description: "City, state, and region.",
  },
  {
    id: "current_job",
    label: "Current role & company",
    description: "Your present title and employer.",
  },
  {
    id: "email",
    label: "Email address",
    description: "Primary email shown to others when permitted.",
  },
  {
    id: "phone",
    label: "Phone number",
    description: "Primary phone for contact.",
  },
  {
    id: "education",
    label: "Education",
    description: "Schools, degrees, and graduation year.",
  },
  {
    id: "work_history",
    label: "Past work experience",
    description: "Previous roles and employers (not your current job).",
  },
  {
    id: "linkedin",
    label: "LinkedIn profile link",
    description: "Link to your public LinkedIn profile.",
  },
] as const;

export type ProfileVisibilityAspectId = (typeof PROFILE_VISIBILITY_ASPECTS)[number]["id"];

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
