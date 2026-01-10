import { AlumniProfile, SearchSuggestion } from "@/types";

// Placeholder avatar URLs using UI Avatars service
const getAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`;

// Placeholder company logo URLs (using logo.clearbit.com for real logos)
const companyLogos: Record<string, string> = {
  Google: "https://logo.clearbit.com/google.com",
  Meta: "https://logo.clearbit.com/meta.com",
  Apple: "https://logo.clearbit.com/apple.com",
  Amazon: "https://logo.clearbit.com/amazon.com",
  Microsoft: "https://logo.clearbit.com/microsoft.com",
  Netflix: "https://logo.clearbit.com/netflix.com",
  Tesla: "https://logo.clearbit.com/tesla.com",
  Stripe: "https://logo.clearbit.com/stripe.com",
  Airbnb: "https://logo.clearbit.com/airbnb.com",
  Uber: "https://logo.clearbit.com/uber.com",
  Salesforce: "https://logo.clearbit.com/salesforce.com",
  Adobe: "https://logo.clearbit.com/adobe.com",
  LinkedIn: "https://logo.clearbit.com/linkedin.com",
  Twitter: "https://logo.clearbit.com/twitter.com",
  Spotify: "https://logo.clearbit.com/spotify.com",
  Slack: "https://logo.clearbit.com/slack.com",
  Dropbox: "https://logo.clearbit.com/dropbox.com",
  Zoom: "https://logo.clearbit.com/zoom.us",
  Square: "https://logo.clearbit.com/squareup.com",
  Palantir: "https://logo.clearbit.com/palantir.com",
  Goldman: "https://logo.clearbit.com/goldmansachs.com",
  JPMorgan: "https://logo.clearbit.com/jpmorganchase.com",
  McKinsey: "https://logo.clearbit.com/mckinsey.com",
  Bain: "https://logo.clearbit.com/bain.com",
  BCG: "https://logo.clearbit.com/bcg.com",
  Deloitte: "https://logo.clearbit.com/deloitte.com",
};

export const alumniProfiles: AlumniProfile[] = [
  {
    id: "1",
    name: "Terence Pae",
    profileImage: getAvatarUrl("Terence Pae"),
    currentCompany: "NiftyKit",
    currentCompanyLogo: "https://logo.clearbit.com/niftykit.com",
    currentRole: "Co-Founder",
    location: "Los Angeles, CA",
    graduationYear: 2010,
    chapter: "Brecek",
    openToContact: true,
    bookmarked: false,
    email: "terence.pae@email.com",
    phone: "(555) 123-4567",
    linkedIn: "https://linkedin.com/in/terencepae",
    companies: [
      { name: "NiftyKit", logo: "https://logo.clearbit.com/niftykit.com" },
      { name: "Zillow Group", logo: companyLogos.Airbnb },
      { name: "Tesla", logo: companyLogos.Tesla },
    ],
    experience: [
      {
        company: "NiftyKit",
        role: "Co-Founder",
        startDate: "2020",
        endDate: "Present",
        description: "Building NFT infrastructure for creators",
      },
      {
        company: "Zillow Group",
        role: "Senior Product Manager",
        startDate: "2017",
        endDate: "2020",
      },
      {
        company: "Tesla",
        role: "Product Manager",
        startDate: "2014",
        endDate: "2017",
      },
    ],
    education: [
      {
        institution: "UC Berkeley",
        degree: "Bachelor of Science",
        field: "Business Administration",
        year: 2010,
      },
    ],
  },
  {
    id: "2",
    name: "Noel De La Torre",
    profileImage: getAvatarUrl("Noel De La Torre"),
    currentCompany: "Mozilla Corporation",
    currentCompanyLogo: "https://logo.clearbit.com/mozilla.org",
    currentRole: "Global Product Marketing Lead",
    location: "LA Metro",
    graduationYear: 2007,
    chapter: "Johnson",
    openToContact: true,
    bookmarked: false,
    email: "noel.delatorre@email.com",
    linkedIn: "https://linkedin.com/in/noeldelatorre",
    companies: [
      { name: "Mozilla Corporation", logo: "https://logo.clearbit.com/mozilla.org" },
      { name: "Adconion Media Group", logo: companyLogos.Adobe },
      { name: "IRONMAN", logo: companyLogos.Nike },
    ],
    experience: [
      {
        company: "Mozilla Corporation",
        role: "Global Product Marketing Lead",
        startDate: "2019",
        endDate: "Present",
      },
      {
        company: "Adconion Media Group",
        role: "Marketing Director",
        startDate: "2015",
        endDate: "2019",
      },
    ],
    education: [
      {
        institution: "UCLA",
        degree: "Bachelor of Arts",
        field: "Marketing",
        year: 2007,
      },
    ],
  },
  {
    id: "3",
    name: "Patrick Paahana",
    profileImage: getAvatarUrl("Patrick Paahana"),
    currentCompany: "At-Bay",
    currentCompanyLogo: "https://logo.clearbit.com/at-bay.com",
    currentRole: "Manager, Brand Design",
    location: "San Francisco, CA",
    graduationYear: 2009,
    chapter: "Paahana",
    openToContact: true,
    bookmarked: false,
    email: "patrick.paahana@email.com",
    phone: "(555) 234-5678",
    linkedIn: "https://linkedin.com/in/patrickpaahana",
    companies: [
      { name: "At-Bay", logo: "https://logo.clearbit.com/at-bay.com" },
      { name: "Microsoft", logo: companyLogos.Microsoft },
      { name: "Apple", logo: companyLogos.Apple },
    ],
    experience: [
      {
        company: "At-Bay",
        role: "Manager, Brand Design",
        startDate: "2021",
        endDate: "Present",
      },
      {
        company: "Microsoft",
        role: "Senior Designer",
        startDate: "2017",
        endDate: "2021",
      },
      {
        company: "Apple",
        role: "Visual Designer",
        startDate: "2013",
        endDate: "2017",
      },
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "Bachelor of Arts",
        field: "Design",
        year: 2009,
      },
    ],
  },
  {
    id: "4",
    name: "Joy Yang",
    profileImage: getAvatarUrl("Joy Yang"),
    currentCompany: "JHY Ventures, Inc.",
    currentCompanyLogo: companyLogos.Stripe,
    currentRole: "Co-Founder & Consultant",
    location: "New York, NY",
    graduationYear: 2011,
    chapter: "Bruges",
    openToContact: true,
    bookmarked: false,
    email: "joy.yang@email.com",
    linkedIn: "https://linkedin.com/in/joyyang",
    companies: [
      { name: "JHY Ventures", logo: companyLogos.Stripe },
      { name: "Goldman Sachs", logo: companyLogos.Goldman },
      { name: "McKinsey", logo: companyLogos.McKinsey },
    ],
    experience: [
      {
        company: "JHY Ventures, Inc.",
        role: "Co-Founder & Consultant",
        startDate: "2019",
        endDate: "Present",
      },
      {
        company: "Goldman Sachs",
        role: "Vice President",
        startDate: "2015",
        endDate: "2019",
      },
      {
        company: "McKinsey & Company",
        role: "Associate",
        startDate: "2011",
        endDate: "2015",
      },
    ],
    education: [
      {
        institution: "Harvard Business School",
        degree: "MBA",
        field: "Finance",
        year: 2015,
      },
      {
        institution: "Yale University",
        degree: "Bachelor of Arts",
        field: "Economics",
        year: 2011,
      },
    ],
  },
  {
    id: "5",
    name: "Jacob Morales",
    profileImage: getAvatarUrl("Jacob Morales"),
    currentCompany: "Collectors Universe, Inc.",
    currentCompanyLogo: companyLogos.Salesforce,
    currentRole: "Technical Recruiter",
    location: "San Diego, CA",
    graduationYear: 2018,
    chapter: "Chou",
    openToContact: true,
    bookmarked: false,
    email: "jacob.morales@email.com",
    phone: "(555) 345-6789",
    linkedIn: "https://linkedin.com/in/jacobmorales",
    companies: [
      { name: "Collectors Universe", logo: companyLogos.Salesforce },
      { name: "LinkedIn", logo: companyLogos.LinkedIn },
    ],
    experience: [
      {
        company: "Collectors Universe, Inc.",
        role: "Technical Recruiter",
        startDate: "2021",
        endDate: "Present",
      },
      {
        company: "LinkedIn",
        role: "Recruiting Coordinator",
        startDate: "2018",
        endDate: "2021",
      },
    ],
    education: [
      {
        institution: "San Diego State University",
        degree: "Bachelor of Science",
        field: "Human Resources",
        year: 2018,
      },
    ],
  },
  {
    id: "6",
    name: "Sarah Chen",
    profileImage: getAvatarUrl("Sarah Chen"),
    currentCompany: "Google",
    currentCompanyLogo: companyLogos.Google,
    currentRole: "Staff Software Engineer",
    location: "Mountain View, CA",
    graduationYear: 2015,
    chapter: "Brecek",
    openToContact: true,
    bookmarked: false,
    email: "sarah.chen@email.com",
    linkedIn: "https://linkedin.com/in/sarahchen",
    companies: [
      { name: "Google", logo: companyLogos.Google },
      { name: "Meta", logo: companyLogos.Meta },
      { name: "Stripe", logo: companyLogos.Stripe },
    ],
    experience: [
      {
        company: "Google",
        role: "Staff Software Engineer",
        startDate: "2020",
        endDate: "Present",
      },
      {
        company: "Meta",
        role: "Senior Software Engineer",
        startDate: "2017",
        endDate: "2020",
      },
      {
        company: "Stripe",
        role: "Software Engineer",
        startDate: "2015",
        endDate: "2017",
      },
    ],
    education: [
      {
        institution: "MIT",
        degree: "Master of Science",
        field: "Computer Science",
        year: 2015,
      },
    ],
  },
  {
    id: "7",
    name: "Marcus Johnson",
    profileImage: getAvatarUrl("Marcus Johnson"),
    currentCompany: "JPMorgan Chase",
    currentCompanyLogo: companyLogos.JPMorgan,
    currentRole: "Managing Director",
    location: "New York, NY",
    graduationYear: 2008,
    chapter: "Johnson",
    openToContact: false,
    bookmarked: false,
    email: "marcus.johnson@email.com",
    companies: [
      { name: "JPMorgan Chase", logo: companyLogos.JPMorgan },
      { name: "Goldman Sachs", logo: companyLogos.Goldman },
    ],
    experience: [
      {
        company: "JPMorgan Chase",
        role: "Managing Director",
        startDate: "2018",
        endDate: "Present",
      },
      {
        company: "Goldman Sachs",
        role: "Vice President",
        startDate: "2012",
        endDate: "2018",
      },
    ],
    education: [
      {
        institution: "Wharton School",
        degree: "MBA",
        field: "Finance",
        year: 2012,
      },
    ],
  },
  {
    id: "8",
    name: "Emily Rodriguez",
    profileImage: getAvatarUrl("Emily Rodriguez"),
    currentCompany: "Airbnb",
    currentCompanyLogo: companyLogos.Airbnb,
    currentRole: "Head of Product Design",
    location: "San Francisco, CA",
    graduationYear: 2012,
    chapter: "Bruges",
    openToContact: true,
    bookmarked: false,
    email: "emily.rodriguez@email.com",
    phone: "(555) 456-7890",
    linkedIn: "https://linkedin.com/in/emilyrodriguez",
    companies: [
      { name: "Airbnb", logo: companyLogos.Airbnb },
      { name: "Uber", logo: companyLogos.Uber },
      { name: "Dropbox", logo: companyLogos.Dropbox },
    ],
    experience: [
      {
        company: "Airbnb",
        role: "Head of Product Design",
        startDate: "2019",
        endDate: "Present",
      },
      {
        company: "Uber",
        role: "Senior Product Designer",
        startDate: "2016",
        endDate: "2019",
      },
    ],
    education: [
      {
        institution: "Rhode Island School of Design",
        degree: "Master of Fine Arts",
        field: "Graphic Design",
        year: 2012,
      },
    ],
  },
  {
    id: "9",
    name: "David Kim",
    profileImage: getAvatarUrl("David Kim"),
    currentCompany: "Bain & Company",
    currentCompanyLogo: companyLogos.Bain,
    currentRole: "Partner",
    location: "Boston, MA",
    graduationYear: 2010,
    chapter: "Paahana",
    openToContact: true,
    bookmarked: false,
    email: "david.kim@email.com",
    linkedIn: "https://linkedin.com/in/davidkim",
    companies: [
      { name: "Bain & Company", logo: companyLogos.Bain },
      { name: "BCG", logo: companyLogos.BCG },
    ],
    experience: [
      {
        company: "Bain & Company",
        role: "Partner",
        startDate: "2018",
        endDate: "Present",
      },
      {
        company: "BCG",
        role: "Principal",
        startDate: "2014",
        endDate: "2018",
      },
    ],
    education: [
      {
        institution: "Harvard Business School",
        degree: "MBA",
        field: "Strategy",
        year: 2014,
      },
    ],
  },
  {
    id: "10",
    name: "Amanda Foster",
    profileImage: getAvatarUrl("Amanda Foster"),
    currentCompany: "Netflix",
    currentCompanyLogo: companyLogos.Netflix,
    currentRole: "Director of Engineering",
    location: "Los Gatos, CA",
    graduationYear: 2013,
    chapter: "Chou",
    openToContact: true,
    bookmarked: false,
    email: "amanda.foster@email.com",
    phone: "(555) 567-8901",
    linkedIn: "https://linkedin.com/in/amandafoster",
    companies: [
      { name: "Netflix", logo: companyLogos.Netflix },
      { name: "Amazon", logo: companyLogos.Amazon },
      { name: "Microsoft", logo: companyLogos.Microsoft },
    ],
    experience: [
      {
        company: "Netflix",
        role: "Director of Engineering",
        startDate: "2020",
        endDate: "Present",
      },
      {
        company: "Amazon",
        role: "Senior Engineering Manager",
        startDate: "2017",
        endDate: "2020",
      },
    ],
    education: [
      {
        institution: "Carnegie Mellon",
        degree: "Master of Science",
        field: "Computer Science",
        year: 2013,
      },
    ],
  },
  {
    id: "11",
    name: "Ryan Mitchell",
    profileImage: getAvatarUrl("Ryan Mitchell"),
    currentCompany: "Palantir",
    currentCompanyLogo: companyLogos.Palantir,
    currentRole: "Forward Deployed Engineer",
    location: "Washington, DC",
    graduationYear: 2019,
    chapter: "Brecek",
    openToContact: true,
    bookmarked: false,
    email: "ryan.mitchell@email.com",
    linkedIn: "https://linkedin.com/in/ryanmitchell",
    companies: [
      { name: "Palantir", logo: companyLogos.Palantir },
    ],
    experience: [
      {
        company: "Palantir",
        role: "Forward Deployed Engineer",
        startDate: "2019",
        endDate: "Present",
      },
    ],
    education: [
      {
        institution: "Georgetown University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        year: 2019,
      },
    ],
  },
  {
    id: "12",
    name: "Jessica Wang",
    profileImage: getAvatarUrl("Jessica Wang"),
    currentCompany: "Spotify",
    currentCompanyLogo: companyLogos.Spotify,
    currentRole: "Product Manager",
    location: "New York, NY",
    graduationYear: 2016,
    chapter: "Johnson",
    openToContact: true,
    bookmarked: false,
    email: "jessica.wang@email.com",
    phone: "(555) 678-9012",
    linkedIn: "https://linkedin.com/in/jessicawang",
    companies: [
      { name: "Spotify", logo: companyLogos.Spotify },
      { name: "Twitter", logo: companyLogos.Twitter },
      { name: "Slack", logo: companyLogos.Slack },
    ],
    experience: [
      {
        company: "Spotify",
        role: "Product Manager",
        startDate: "2020",
        endDate: "Present",
      },
      {
        company: "Twitter",
        role: "Associate Product Manager",
        startDate: "2018",
        endDate: "2020",
      },
    ],
    education: [
      {
        institution: "Northwestern University",
        degree: "Bachelor of Science",
        field: "Industrial Engineering",
        year: 2016,
      },
    ],
  },
  {
    id: "13",
    name: "Michael Thompson",
    profileImage: getAvatarUrl("Michael Thompson"),
    currentCompany: "Deloitte",
    currentCompanyLogo: companyLogos.Deloitte,
    currentRole: "Senior Manager",
    location: "Chicago, IL",
    graduationYear: 2014,
    chapter: "Bruges",
    openToContact: false,
    bookmarked: false,
    email: "michael.thompson@email.com",
    companies: [
      { name: "Deloitte", logo: companyLogos.Deloitte },
    ],
    experience: [
      {
        company: "Deloitte",
        role: "Senior Manager",
        startDate: "2014",
        endDate: "Present",
      },
    ],
    education: [
      {
        institution: "University of Chicago",
        degree: "MBA",
        field: "Consulting",
        year: 2018,
      },
    ],
  },
  {
    id: "14",
    name: "Lisa Park",
    profileImage: getAvatarUrl("Lisa Park"),
    currentCompany: "Square",
    currentCompanyLogo: companyLogos.Square,
    currentRole: "VP of Marketing",
    location: "San Francisco, CA",
    graduationYear: 2011,
    chapter: "Paahana",
    openToContact: true,
    bookmarked: false,
    email: "lisa.park@email.com",
    linkedIn: "https://linkedin.com/in/lisapark",
    companies: [
      { name: "Square", logo: companyLogos.Square },
      { name: "Salesforce", logo: companyLogos.Salesforce },
      { name: "Adobe", logo: companyLogos.Adobe },
    ],
    experience: [
      {
        company: "Square",
        role: "VP of Marketing",
        startDate: "2019",
        endDate: "Present",
      },
      {
        company: "Salesforce",
        role: "Director of Marketing",
        startDate: "2015",
        endDate: "2019",
      },
    ],
    education: [
      {
        institution: "UC Berkeley",
        degree: "Bachelor of Arts",
        field: "Business Administration",
        year: 2011,
      },
    ],
  },
  {
    id: "15",
    name: "Kevin Nguyen",
    profileImage: getAvatarUrl("Kevin Nguyen"),
    currentCompany: "Zoom",
    currentCompanyLogo: companyLogos.Zoom,
    currentRole: "Senior Software Engineer",
    location: "San Jose, CA",
    graduationYear: 2017,
    chapter: "Chou",
    openToContact: true,
    bookmarked: false,
    email: "kevin.nguyen@email.com",
    phone: "(555) 789-0123",
    linkedIn: "https://linkedin.com/in/kevinnguyen",
    companies: [
      { name: "Zoom", logo: companyLogos.Zoom },
      { name: "Slack", logo: companyLogos.Slack },
    ],
    experience: [
      {
        company: "Zoom",
        role: "Senior Software Engineer",
        startDate: "2020",
        endDate: "Present",
      },
      {
        company: "Slack",
        role: "Software Engineer",
        startDate: "2017",
        endDate: "2020",
      },
    ],
    education: [
      {
        institution: "UC San Diego",
        degree: "Bachelor of Science",
        field: "Computer Science",
        year: 2017,
      },
    ],
  },
  {
    id: "16",
    name: "Rachel Green",
    profileImage: getAvatarUrl("Rachel Green"),
    currentCompany: "Apple",
    currentCompanyLogo: companyLogos.Apple,
    currentRole: "Hardware Engineer",
    location: "Cupertino, CA",
    graduationYear: 2020,
    chapter: "Brecek",
    openToContact: true,
    bookmarked: false,
    email: "rachel.green@email.com",
    linkedIn: "https://linkedin.com/in/rachelgreen",
    companies: [
      { name: "Apple", logo: companyLogos.Apple },
    ],
    experience: [
      {
        company: "Apple",
        role: "Hardware Engineer",
        startDate: "2020",
        endDate: "Present",
      },
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "Master of Science",
        field: "Electrical Engineering",
        year: 2020,
      },
    ],
  },
  {
    id: "17",
    name: "Daniel Lee",
    profileImage: getAvatarUrl("Daniel Lee"),
    currentCompany: "Amazon",
    currentCompanyLogo: companyLogos.Amazon,
    currentRole: "Principal Product Manager",
    location: "Seattle, WA",
    graduationYear: 2012,
    chapter: "Johnson",
    openToContact: true,
    bookmarked: false,
    email: "daniel.lee@email.com",
    phone: "(555) 890-1234",
    linkedIn: "https://linkedin.com/in/daniellee",
    companies: [
      { name: "Amazon", logo: companyLogos.Amazon },
      { name: "Microsoft", logo: companyLogos.Microsoft },
      { name: "Google", logo: companyLogos.Google },
    ],
    experience: [
      {
        company: "Amazon",
        role: "Principal Product Manager",
        startDate: "2018",
        endDate: "Present",
      },
      {
        company: "Microsoft",
        role: "Senior Product Manager",
        startDate: "2015",
        endDate: "2018",
      },
    ],
    education: [
      {
        institution: "University of Washington",
        degree: "Bachelor of Science",
        field: "Computer Science",
        year: 2012,
      },
    ],
  },
  {
    id: "18",
    name: "Sophia Martinez",
    profileImage: getAvatarUrl("Sophia Martinez"),
    currentCompany: "Meta",
    currentCompanyLogo: companyLogos.Meta,
    currentRole: "Research Scientist",
    location: "Menlo Park, CA",
    graduationYear: 2021,
    chapter: "Bruges",
    openToContact: true,
    bookmarked: false,
    email: "sophia.martinez@email.com",
    linkedIn: "https://linkedin.com/in/sophiamartinez",
    companies: [
      { name: "Meta", logo: companyLogos.Meta },
    ],
    experience: [
      {
        company: "Meta",
        role: "Research Scientist",
        startDate: "2021",
        endDate: "Present",
      },
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "PhD",
        field: "Artificial Intelligence",
        year: 2021,
      },
    ],
  },
];

// Get unique values for filters
export const getUniqueCompanies = (): string[] => {
  const companies = new Set<string>();
  alumniProfiles.forEach((profile) => {
    profile.companies.forEach((company) => companies.add(company.name));
  });
  return Array.from(companies).sort();
};

export const getUniqueRoles = (): string[] => {
  const roles = new Set<string>();
  alumniProfiles.forEach((profile) => {
    roles.add(profile.currentRole);
  });
  return Array.from(roles).sort();
};

export const getUniqueCities = (): string[] => {
  const cities = new Set<string>();
  alumniProfiles.forEach((profile) => {
    cities.add(profile.location);
  });
  return Array.from(cities).sort();
};

export const getUniqueChapters = (): string[] => {
  const chapters = new Set<string>();
  alumniProfiles.forEach((profile) => {
    chapters.add(profile.chapter);
  });
  return Array.from(chapters).sort();
};

export const graduationYearRange: [number, number] = [2007, 2025];

// Search suggestions
export const recentSearches: SearchSuggestion[] = [
  { id: "r1", text: "Software Engineers in Bay Area", type: "recent" },
  { id: "r2", text: "Product Managers at FAANG", type: "recent" },
  { id: "r3", text: "Class of 2015", type: "recent" },
];

export const suggestedSearches: SearchSuggestion[] = [
  { id: "s1", text: "West coast FAANG workers", type: "suggested" },
  { id: "s2", text: "Finance professionals in NYC", type: "suggested" },
  { id: "s3", text: "Founders and entrepreneurs", type: "suggested" },
  { id: "s4", text: "Design leaders", type: "suggested" },
];
