// Alumni Profile Types for Business Edge Portal

export interface Company {
  name: string;
  logo?: string; // URL to company logo (placeholder for now)
}

export interface Experience {
  company: string;
  companyLogo?: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: number;
}

export interface AlumniProfile {
  id: string;
  name: string;
  profileImage: string; // placeholder URL
  currentCompany: string;
  currentCompanyLogo?: string;
  currentRole: string;
  location: string;
  graduationYear: number;
  chapter: string;
  openToContact: boolean;
  bookmarked: boolean;
  email: string;
  phone?: string;
  linkedIn?: string;
  // Companies worked at (for the stacked logo display)
  companies: Company[];
  experience: Experience[];
  education: Education[];
}

// Filter state types
export interface FilterState {
  companies: string[];
  roles: string[];
  cities: string[];
  graduationYearRange: [number, number];
  hasProfessionalInfo: boolean;
}

// Search suggestion types
export interface SearchSuggestion {
  id: string;
  text: string;
  type: "recent" | "suggested";
}
