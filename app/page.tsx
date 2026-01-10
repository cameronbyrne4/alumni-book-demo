"use client";

import { useState, useMemo } from "react";
import { User, LayoutGrid, List } from "lucide-react";
import { Header } from "@/components/Header";
import { FilterSection } from "@/components/FilterSection";
import { ProfileCard } from "@/components/ProfileCard";
import { ProfileDetailModal } from "@/components/ProfileDetailModal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { 
  alumniProfiles as initialProfiles, 
  getUniqueCompanies, 
  getUniqueRoles, 
  getUniqueCities,
  getUniqueChapters,
  graduationYearRange as defaultYearRange
} from "@/lib/data";
import { FilterState, AlumniProfile } from "@/types";

export default function Home() {
  const [profiles, setProfiles] = useState<AlumniProfile[]>(initialProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    companies: [],
    roles: [],
    cities: [],
    chapters: [],
    graduationYearRange: defaultYearRange,
    isOpenToContact: false,
  });

  const availableCompanies = useMemo(() => getUniqueCompanies(), []);
  const availableRoles = useMemo(() => getUniqueRoles(), []);
  const availableCities = useMemo(() => getUniqueCities(), []);
  const availableChapters = useMemo(() => getUniqueChapters(), []);

  // Filtering logic
  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      // Search query filtering
      const matchesSearch = searchQuery === "" || 
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.currentRole.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // Category filtering
      if (filters.companies.length > 0 && !profile.companies.some(c => filters.companies.includes(c.name))) {
        return false;
      }
      
      if (filters.roles.length > 0 && !filters.roles.includes(profile.currentRole)) {
        return false;
      }

      if (filters.cities.length > 0 && !filters.cities.includes(profile.location)) {
        return false;
      }

      if (filters.chapters.length > 0 && !filters.chapters.includes(profile.chapter)) {
        return false;
      }

      // Graduation Year filtering
      if (profile.graduationYear < filters.graduationYearRange[0] || 
          profile.graduationYear > filters.graduationYearRange[1]) {
        return false;
      }

      // Open to Contact filtering
      if (filters.isOpenToContact && !profile.openToContact) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters, profiles]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleBookmark = (id: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === id ? { ...p, bookmarked: !p.bookmarked } : p
    ));
  };

  const handleProfileClick = (profile: AlumniProfile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Don't null the profile immediately to avoid layout shifts during closing animation
    setTimeout(() => setSelectedProfile(null), 300);
  };

  return (
    <div className="h-screen flex flex-col bg-[#fafafa] overflow-hidden">
      <Header onSearch={handleSearch}>
        <FilterSection
          filters={filters}
          onFilterChange={setFilters}
          availableCompanies={availableCompanies}
          availableRoles={availableRoles}
          availableCities={availableCities}
          availableChapters={availableChapters}
          yearRange={defaultYearRange}
        />
      </Header>
      
      <main className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* View Toggle and Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">
              {filteredProfiles.length} Results
            </h2>
            <div className="h-4 w-px bg-gray-200 mx-2" />
            <p className="text-sm text-gray-500 font-medium">
              Alumni matching your search
            </p>
          </div>

          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
            className="bg-white border border-gray-200 rounded-lg p-1 shadow-sm"
          >
            <ToggleGroupItem 
              value="grid" 
              aria-label="Grid View"
              className="data-[state=on]:bg-[#a60021]/5 data-[state=on]:text-[#a60021]"
            >
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="list" 
              aria-label="List View"
              className="data-[state=on]:bg-[#a60021]/5 data-[state=on]:text-[#a60021]"
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Profiles Grid/List */}
        <div className={cn(
          "grid gap-6",
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        )}>
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              viewMode={viewMode}
              onBookmarkToggle={toggleBookmark}
              onClick={handleProfileClick}
            />
          ))}
        </div>

        {/* Empty State */}
          {filteredProfiles.length === 0 && (
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                <User className="h-6 w-6" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No profiles found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      <ProfileDetailModal 
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
