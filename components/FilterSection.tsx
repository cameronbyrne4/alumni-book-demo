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
  resultsCount: number;
  availableCompanies: string[];
  availableRoles: string[];
  availableCities: string[];
  yearRange: [number, number];
}

export function FilterSection({
  filters,
  onFilterChange,
  resultsCount,
  availableCompanies,
  availableRoles,
  availableCities,
  yearRange,
}: FilterSectionProps) {
  const hasActiveFilters =
    filters.companies.length > 0 ||
    filters.roles.length > 0 ||
    filters.cities.length > 0 ||
    filters.graduationYearRange[0] !== yearRange[0] ||
    filters.graduationYearRange[1] !== yearRange[1] ||
    filters.isOpenToContact;

  const clearFilters = () => {
    onFilterChange({
      companies: [],
      roles: [],
      cities: [],
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Companies Filter */}
          <FilterDropdown
            label="Companies"
            items={availableCompanies}
            selectedItems={filters.companies}
            onToggle={(item) => toggleItem("companies", item)}
          />

          {/* Roles Filter */}
          <FilterDropdown
            label="Roles"
            items={availableRoles}
            selectedItems={filters.roles}
            onToggle={(item) => toggleItem("roles", item)}
          />

          {/* Cities Filter */}
          <FilterDropdown
            label="Cities"
            items={availableCities}
            selectedItems={filters.cities}
            onToggle={(item) => toggleItem("cities", item)}
          />

          {/* Graduation Year Slider */}
          <div className="flex flex-col gap-2 min-w-[200px] px-2">
            <span className="text-xs font-medium text-gray-500">
              Graduation Year: {filters.graduationYearRange[0]} - {filters.graduationYearRange[1]}
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

          {/* Open to Contact Checkbox */}
          <div className="flex items-center space-x-2 px-2 h-10">
            <Checkbox 
              id="open-to-contact" 
              checked={filters.isOpenToContact}
              onCheckedChange={(checked) => 
                onFilterChange({ ...filters, isOpenToContact: !!checked })
              }
            />
            <label
              htmlFor="open-to-contact"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Open to Contact
            </label>
          </div>
        </div>

        {/* Results Found & Clear Filters */}
        <div className="flex items-center gap-4 ml-auto pb-1">
          <span className="text-sm font-medium text-gray-500">
            {resultsCount} Results Found
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-[#a60021] hover:underline flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          )}
        </div>
      </div>
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
