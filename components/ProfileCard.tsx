"use client";

import * as React from "react";
import { Mail, Linkedin, MapPin, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlumniProfile } from "@/types";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: AlumniProfile;
  viewMode?: "grid" | "list";
  onBookmarkToggle?: (id: string) => void;
  onClick?: (profile: AlumniProfile) => void;
}

export function ProfileCard({ profile, viewMode = "grid", onBookmarkToggle, onClick }: ProfileCardProps) {
  const isList = viewMode === "list";

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkToggle?.(profile.id);
  };

  const getFallbackLogo = (name: string) => 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f5f5f5&color=a3a3a3&size=64`;

  if (isList) {
    return (
      <Card 
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-gray-100 bg-white"
        onClick={() => onClick?.(profile)}
      >
        <CardContent className="p-4 flex items-center gap-6">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm flex-shrink-0">
            <AvatarImage src={profile.profileImage} alt={profile.name} />
            <AvatarFallback className="bg-gray-100 text-[#a60021] font-bold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#a60021] transition-colors truncate">
                {profile.name}
              </h3>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none px-1.5 py-0 text-[9px] font-bold rounded-md flex-shrink-0">
                🎓 {profile.graduationYear}
              </Badge>
            </div>
            <p className="text-xs font-medium text-gray-500 truncate">
              {profile.currentRole} @ {profile.currentCompany}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 mt-1">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 px-4 border-l border-gray-50">
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Companies</div>
            <div className="flex items-center -space-x-1.5">
              {profile.companies.slice(0, 3).map((company, index) => (
                <div key={index} className="h-6 w-6 rounded-full border border-white bg-white shadow-sm overflow-hidden flex items-center justify-center p-0.5">
                  <img 
                    src={company.logo || getFallbackLogo(company.name)} 
                    alt={company.name} 
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getFallbackLogo(company.name);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 pl-4 border-l border-gray-50">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-[#a60021]" onClick={(e) => { e.stopPropagation(); window.open(`mailto:${profile.email}`) }}>
              <Mail className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8 rounded-full", profile.bookmarked ? "text-[#a60021]" : "text-gray-400")}
              onClick={handleBookmarkClick}
            >
              <Bookmark className={cn("h-4 w-4", profile.bookmarked && "fill-current")} />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-gray-100 bg-white"
      onClick={() => onClick?.(profile)}
    >
      {/* Decorative Background Lines */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_48%,#a60021_49%,#a60021_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      <CardContent className="p-6">
        {/* Top Badges */}
        <div className="flex justify-between items-start mb-4">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-none px-2 py-0 text-[10px] font-bold rounded-md">
            🎓 {profile.graduationYear}
          </Badge>
          <Badge className="bg-[#a60021]/10 text-[#a60021] hover:bg-[#a60021]/15 border-none px-2 py-0 text-[10px] font-bold rounded-md capitalize">
            {profile.chapter}
          </Badge>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="h-20 w-20 mb-3 border-2 border-white shadow-sm">
            <AvatarImage src={profile.profileImage} alt={profile.name} />
            <AvatarFallback className="bg-gray-100 text-[#a60021] font-bold text-xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#a60021] transition-colors">
            {profile.name}
          </h3>
          <p className="text-xs font-medium text-gray-500 mt-1">
            {profile.currentRole} @ {profile.currentCompany}
          </p>
        </div>

        {/* Company Logo Stack */}
        <div className="mb-6">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-200" />
            COMPANIES
          </div>
          <div className="flex items-center -space-x-2">
            {profile.companies.slice(0, 4).map((company, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative h-8 w-8 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden flex items-center justify-center p-1">
                      <img 
                        src={company.logo || getFallbackLogo(company.name)} 
                        alt={company.name} 
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getFallbackLogo(company.name);
                        }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{company.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {profile.companies.length > 4 && (
              <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">
                +{profile.companies.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions & Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full text-gray-400 hover:text-[#a60021] hover:bg-[#a60021]/5"
              onClick={(e) => { e.stopPropagation(); window.open(`mailto:${profile.email}`) }}
            >
              <Mail className="h-4 w-4" />
            </Button>
            {profile.linkedIn && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                onClick={(e) => { e.stopPropagation(); window.open(profile.linkedIn, '_blank') }}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-7 w-7 rounded-full transition-colors",
                profile.bookmarked ? "text-[#a60021] bg-[#a60021]/5" : "text-gray-400 hover:text-[#a60021] hover:bg-[#a60021]/5"
              )}
              onClick={handleBookmarkClick}
            >
              <Bookmark className={cn("h-4 w-4", profile.bookmarked && "fill-current")} />
            </Button>
          </div>
          
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
            <MapPin className="h-3 w-3" />
            {profile.location}
          </div>
        </div>
      </CardContent>

      {/* Hover Indicator Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a60021] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Card>
  );
}
