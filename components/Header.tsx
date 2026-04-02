"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell, Mail, User, History, Sparkles, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { recentSearches, suggestedSearches } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearch?: (query: string) => void;
  children?: React.ReactNode;
}

export function Header({ onSearch, children }: HeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll for sticky header elevation
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSelect = (text: string) => {
    setSearchQuery(text);
    setIsSearchOpen(false);
    onSearch?.(text);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    onSearch?.(searchQuery);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 border-b",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-gray-200 shadow-sm" 
          : "bg-white border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* 1. Logo */}
        <div className="flex-shrink-0 flex items-center">
          <div className="relative h-10 w-40">
            <Image
              src="/logo.png"
              alt="Business Edge"
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* 2. Search Bar (LinkedIn Style) */}
        <div className="flex-1 flex justify-center max-w-2xl px-2">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <form onSubmit={handleSearchSubmit} className="w-full group">
                <div className="relative w-full">
                  <Search className={cn(
                    "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
                    isSearchOpen ? "text-[#a60021]" : "text-gray-400"
                  )} />
                  <Input
                    type="text"
                    placeholder="Search alumni, companies, or roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    className={cn(
                      "h-10 w-full rounded-md bg-[#f3f3f3] pl-10 pr-4 text-sm transition-all duration-200 border-transparent",
                      "focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-[#a60021]/30 focus-visible:border-[#a60021]/20",
                      "hover:bg-[#e8e8e8]"
                    )}
                  />
                </div>
              </form>
            </PopoverTrigger>
            <PopoverContent 
              className="w-[var(--radix-popover-trigger-width)] p-0 shadow-xl border-gray-200" 
              align="start"
              sideOffset={4}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command className="rounded-lg">
                <CommandList className="custom-scrollbar">
                  {recentSearches.length > 0 && (
                    <CommandGroup heading={
                      <div className="flex items-center gap-2 text-xs font-semibold py-1">
                        <History className="h-3 w-3" />
                        <span>Recent Searches</span>
                      </div>
                    }>
                      {recentSearches.map((search) => (
                        <CommandItem
                          key={search.id}
                          onSelect={() => handleSearchSelect(search.text)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between group"
                        >
                          <span className="text-sm text-gray-700">{search.text}</span>
                          <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  <CommandSeparator />
                  {suggestedSearches.length > 0 && (
                    <CommandGroup heading={
                      <div className="flex items-center gap-2 text-xs font-semibold py-1">
                        <Sparkles className="h-3 w-3 text-[#a60021]" />
                        <span>Suggested for you</span>
                      </div>
                    }>
                      {suggestedSearches.map((search) => (
                        <CommandItem
                          key={search.id}
                          onSelect={() => handleSearchSelect(search.text)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between group"
                        >
                          <span className="text-sm text-gray-700">{search.text}</span>
                          <span className="text-[10px] text-[#a60021]/70 opacity-0 group-hover:opacity-100 transition-opacity">Try this</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* 3 & 4. Icons and Profile */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Inbox */}
          <button
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#a60021] transition-all"
            aria-label="Messages"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </button>

          {/* Notifications */}
          <button
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#a60021] transition-all"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 flex h-2 w-2 items-center justify-center rounded-full bg-[#a60021] ring-2 ring-white" />
            <span className="sr-only">Notifications</span>
          </button>

          {/* Profile Avatar — menu includes Settings */}
          <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block" />

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full p-0.5 pr-2 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 outline-none focus-visible:ring-2 focus-visible:ring-[#a60021]/30 focus-visible:ring-offset-2"
                aria-label="Account menu"
                aria-haspopup="dialog"
              >
                <Avatar className="h-8 w-8 ring-1 ring-gray-100">
                  <AvatarFallback className="bg-gray-100 text-[#a60021] text-xs font-bold">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-xs font-medium text-gray-700">Me</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-56 p-1 border-gray-200 shadow-lg"
            >
              <nav aria-label="Account">
                <Link
                  href="/settings"
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#a60021]"
                >
                  <Settings className="h-4 w-4 shrink-0 text-gray-500" aria-hidden />
                  Settings
                </Link>
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* 2. Sub-header for Filters (LinkedIn Style) */}
      {children && (
        <div className="border-t border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      )}
    </header>
  );
}
