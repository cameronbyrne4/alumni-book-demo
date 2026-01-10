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

const lineageColors: Record<string, string> = {
  Brecek: "bg-amber-100 text-amber-700",
  Johnson: "bg-emerald-100 text-emerald-700",
  Paahana: "bg-blue-100 text-blue-700",
  Bruges: "bg-purple-100 text-purple-700",
  Chou: "bg-rose-100 text-rose-700",
};

export function ProfileCard({ profile, viewMode = "grid", onBookmarkToggle, onClick }: ProfileCardProps) {
  const isList = viewMode === "list";

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkToggle?.(profile.id);
  };

  const getFallbackLogo = (name: string) => 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f5f5f5&color=a3a3a3&size=64`;

  const [profileImageError, setProfileImageError] = React.useState(false);

  if (isList) {
    return (
      <Card 
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-gray-100 bg-white"
        onClick={() => onClick?.(profile)}
      >
        <CardContent className="p-3 flex items-center gap-6">
          <Avatar className="h-14 w-14 border-2 border-white shadow-sm flex-shrink-0">
            {!profileImageError ? (
              <AvatarImage 
                src={profile.profileImage} 
                alt={profile.name} 
                className="object-cover" 
                onError={() => setProfileImageError(true)}
              />
            ) : null}
            <AvatarFallback className="bg-gray-100 text-[#a60021] font-bold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#a60021] transition-colors truncate">
                {profile.name}
              </h3>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none px-1.5 py-0 text-[9px] font-bold rounded-md flex-shrink-0">
                🎓 {profile.graduationYear}
              </Badge>
              {profile.openToContact && (
                <Badge className="bg-green-100 text-green-700 border-none px-1.5 py-0 text-[9px] font-bold rounded-md flex-shrink-0">
                  Open to Contact
                </Badge>
              )}
            </div>
            <p className="text-xs font-medium text-gray-500 truncate">
              {profile.currentRole} @ {profile.currentCompany}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 mt-0.5">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 px-4 border-l border-gray-50">
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Companies</div>
            <div className="flex flex-row-reverse items-center -space-x-reverse -space-x-1.5">
              {[...profile.companies].slice(0, 3).reverse().map((company, index) => (
                <div key={index} className="h-6 w-6 rounded-full border border-white bg-zinc-800 shadow-sm overflow-hidden flex items-center justify-center">
                  <img 
                    src={company.logo || getFallbackLogo(company.name)} 
                    alt={company.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getFallbackLogo(company.name);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 pl-4 border-l border-gray-50 min-w-[100px] justify-end">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-[#a60021]" onClick={(e) => { e.stopPropagation(); window.open(`mailto:${profile.email}`) }}>
              <Mail className="h-4 w-4" />
            </Button>
            {profile.linkedIn && (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-blue-600" onClick={(e) => { e.stopPropagation(); window.open(profile.linkedIn, '_blank') }}>
                <Linkedin className="h-4 w-4" />
              </Button>
            )}
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
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-gray-100 bg-white flex flex-col"
      onClick={() => onClick?.(profile)}
    >
      {/* Decorative Background Lines */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_48%,#a60021_49%,#a60021_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      <CardContent className="p-4 flex flex-col h-full">
        {/* Top Badges */}
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-none px-2 py-0 text-[10px] font-bold rounded-md">
            🎓 {profile.graduationYear}
          </Badge>
          <Badge className={cn(
            "border-none px-2 py-0 text-[10px] font-bold rounded-md capitalize",
            lineageColors[profile.chapter] || "bg-gray-100 text-gray-700"
          )}>
            {profile.chapter}
          </Badge>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-3 border-2 border-white shadow-sm">
            {!profileImageError ? (
              <AvatarImage 
                src={profile.profileImage} 
                alt={profile.name} 
                className="object-cover" 
                onError={() => setProfileImageError(true)}
              />
            ) : null}
            <AvatarFallback className="bg-gray-100 text-[#a60021] font-bold text-xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="min-h-[3rem] flex flex-col justify-center">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#a60021] transition-colors leading-tight">
              {profile.name}
            </h3>
            {profile.openToContact && (
              <span className="text-[9px] font-bold text-green-600 uppercase tracking-tight mt-0.5">
                • Open to Contact
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-gray-500 mt-1 line-clamp-2">
            {profile.currentRole} @ {profile.currentCompany}
          </p>
        </div>

        <div className="mb-4 mt-auto">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-200" />
            COMPANIES
          </div>
          <div className="flex flex-row-reverse justify-end items-center -space-x-reverse -space-x-2">
            {profile.companies.length > 4 && (
              <div className="relative z-0 h-8 w-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">
                +{profile.companies.length - 4}
              </div>
            )}
            {[...profile.companies].slice(0, 4).reverse().map((company, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative h-8 w-8 rounded-full border-2 border-white bg-zinc-800 shadow-sm overflow-hidden flex items-center justify-center">
                      <img 
                        src={company.logo || getFallbackLogo(company.name)} 
                        alt={company.name} 
                        className="h-full w-full object-cover"
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
          </div>
        </div>

        {/* Footer Actions & Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
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
