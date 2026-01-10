"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";
import { FilterState } from "@/types";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableCompanies: string[];
  availableRoles: string[];
  availableCities: string[];
  availableChapters: string[];
  yearRange: [number, number];
}

export function FilterSection({
  filters,
  onFilterChange,
  availableCompanies,
  availableRoles,
  availableCities,
  availableChapters,
  yearRange,
}: FilterSectionProps) {
  const hasActiveFilters =
    filters.companies.length > 0 ||
    filters.roles.length > 0 ||
    filters.cities.length > 0 ||
    filters.chapters.length > 0 ||
    filters.graduationYearRange[0] !== yearRange[0] ||
    filters.graduationYearRange[1] !== yearRange[1] ||
    filters.isOpenToContact;

  const clearFilters = () => {
    onFilterChange({
      companies: [],
      roles: [],
      cities: [],
      chapters: [],
      graduationYearRange: yearRange,
      isOpenToContact: false,
    });
  };

  const toggleItem = (category: keyof FilterState, item: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    
    onFilterChange({
      ...filters,
      [category]: updated,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      {/* 1. Graduation Year Slider (Moved to front for prominence) */}
      <div className="flex flex-col gap-1 min-w-[160px] px-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Grad Year: {filters.graduationYearRange[0]} - {filters.graduationYearRange[1]}
        </span>
        <Slider
          defaultValue={[filters.graduationYearRange[0], filters.graduationYearRange[1]]}
          max={yearRange[1]}
          min={yearRange[0]}
          step={1}
          value={[filters.graduationYearRange[0], filters.graduationYearRange[1]]}
          onValueChange={(value) => 
            onFilterChange({ ...filters, graduationYearRange: value as [number, number] })
          }
          className="py-1"
        />
      </div>

      <div className="h-8 w-px bg-gray-100 mx-2" />

      {/* 2. Chapter Filter (New) */}
      <FilterDropdown
        label="Chapters"
        items={availableChapters}
        selectedItems={filters.chapters}
        onToggle={(item) => toggleItem("chapters", item)}
      />

      {/* 3. Cities Filter */}
      <FilterDropdown
        label="Cities"
        items={availableCities}
        selectedItems={filters.cities}
        onToggle={(item) => toggleItem("cities", item)}
      />

      {/* 4. Companies Filter */}
      <FilterDropdown
        label="Companies"
        items={availableCompanies}
        selectedItems={filters.companies}
        onToggle={(item) => toggleItem("companies", item)}
      />

      {/* 5. Roles Filter */}
      <FilterDropdown
        label="Roles"
        items={availableRoles}
        selectedItems={filters.roles}
        onToggle={(item) => toggleItem("roles", item)}
      />

      {/* 6. Open to Contact Checkbox */}
      <div className="flex items-center space-x-2 px-2 h-9 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
        <Checkbox 
          id="open-to-contact" 
          checked={filters.isOpenToContact}
          onCheckedChange={(checked) => 
            onFilterChange({ ...filters, isOpenToContact: !!checked })
          }
          className="h-4 w-4 data-[state=checked]:bg-[#a60021] data-[state=checked]:border-[#a60021]"
        />
        <label
          htmlFor="open-to-contact"
          className="text-xs font-semibold text-gray-600 cursor-pointer pr-2"
        >
          Open to Contact
        </label>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="ml-auto text-xs font-bold text-[#a60021] hover:underline flex items-center gap-1"
        >
          <X className="h-3 w-3" />
          Reset All
        </button>
      )}
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}

function FilterDropdown({ label, items, selectedItems, onToggle }: FilterDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 rounded-full px-4 border-gray-300 transition-all",
            selectedItems.length > 0 && "border-[#a60021] bg-[#a60021]/5 text-[#a60021]"
          )}
        >
          {label}
          {selectedItems.length > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-[#a60021] text-white text-[10px]"
            >
              {selectedItems.length}
            </Badge>
          )}
          <ChevronDown className={cn("ml-2 h-4 w-4 opacity-50 transition-transform", open && "rotate-180")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList className="custom-scrollbar">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => onToggle(item)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border border-gray-300 transition-colors",
                      selectedItems.includes(item) && "bg-[#a60021] border-[#a60021]"
                    )}>
                      {selectedItems.includes(item) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span>{item}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
