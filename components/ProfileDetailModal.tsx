"use client";

import * as React from "react";
import { 
  X, 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin,
  ChevronUp,
  ChevronDown,
  UserPlus
} from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlumniProfile } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProfileDetailModalProps {
  profile: AlumniProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function CollapsibleSection({ title, defaultOpen = true, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function ProfileDetailModal({ profile, isOpen, onClose }: ProfileDetailModalProps) {
  if (!profile) return null;

  const handleConnect = () => {
    toast.success(`Connection request sent to ${profile.name}`, {
      description: "They will be notified of your interest.",
      duration: 3000,
    });
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    toast.info(`Opening email client to contact ${profile.name}...`, {
      duration: 2000,
    });
  };

  // Get company logo from the companies array or generate a fallback
  const getCompanyLogo = (companyName: string) => {
    const company = profile.companies.find(c => c.name === companyName);
    if (company?.logo) return company.logo;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=27272a&color=fff&size=64`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden p-0 border border-gray-200 bg-white gap-0 rounded-xl shadow-2xl">
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Header - Fixed */}
          <div className="p-6 pb-4 bg-white relative shrink-0 pr-12">
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <Avatar className="h-20 w-20 border-2 border-gray-100 shadow-sm">
                <AvatarImage src={profile.profileImage} alt={profile.name} className="object-cover" />
                <AvatarFallback className="bg-gray-100 text-[#a60021] text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {/* Name & Title */}
              <div className="flex-1 min-w-0 pt-1">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600 font-semibold text-base mt-1">
                  {profile.currentRole} <span className="text-gray-400 font-normal mx-1">@</span> {profile.currentCompany}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Button 
                    onClick={handleConnect}
                    className="bg-[#a60021] hover:bg-[#8a001a] text-white font-bold h-8 px-4 text-xs rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Connect
                  </Button>
                  <div className="flex items-center gap-2">
                    
                    {profile.openToContact && (
                      <Badge className="bg-green-50 text-green-700 border-none font-bold uppercase text-[10px] tracking-wider px-2 py-0.5">
                        Open to Contact
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-100 shrink-0" />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar my-1 px-6">
            {/* Contact Info */}
            <div className="py-4 flex flex-col gap-3">
              {/* Email */}
              <a 
                href={`mailto:${profile.email}`}
                onClick={handleEmailClick}
                className="flex items-center gap-3 text-gray-600 hover:text-[#a60021] transition-colors group"
              >
                <Mail className="h-4 w-4 text-gray-400 group-hover:text-[#a60021] transition-colors" />
                <span className="text-sm font-medium">{profile.email}</span>
              </a>

              {/* Phone */}
              {profile.phone && (
                <a 
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors group"
                >
                  <Phone className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  <span className="text-sm font-medium">{profile.phone}</span>
                </a>
              )}

              {/* Location */}
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">{profile.location}</span>
              </div>

              {/* LinkedIn */}
              {profile.linkedIn && (
                <a 
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <span className="text-sm font-medium truncate">{profile.linkedIn.replace('https://', '')}</span>
                </a>
              )}
            </div>

            <Separator className="bg-gray-50" />

            {/* About Section */}
            <CollapsibleSection title="About">
              <p className="text-gray-600 text-sm leading-relaxed pb-2">
                {profile.about || `Experienced professional with a focus on ${profile.currentRole.toLowerCase()} within the ${profile.currentCompany} organization.`}
              </p>
            </CollapsibleSection>

            <Separator className="bg-gray-50" />

            {/* Experience Section */}
            <CollapsibleSection title="Experience">
              <div className="space-y-8 pb-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Company Logo */}
                    <div className="flex-shrink-0 pt-1">
                      <div className="h-12 w-12 rounded-lg bg-zinc-800 overflow-hidden border border-gray-100 shadow-sm">
                        <img 
                          src={getCompanyLogo(exp.company)}
                          alt={exp.company}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Experience Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className={cn(
                          "text-sm font-bold",
                          exp.endDate === "Present" || exp.role.includes("(Acquired)") ? "text-[#a60021]" : "text-gray-600"
                        )}>
                          {exp.company}
                        </p>
                        <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">{exp.role}</h4>
                      {exp.description && (
                        <ul className="mt-3 space-y-2">
                          {exp.description.split('. ').filter(Boolean).map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="text-sm text-gray-600 flex leading-normal">
                              <span className="mr-2 text-[#a60021]/40 shrink-0">•</span>
                              <span>{bullet.trim().endsWith('.') ? bullet.trim() : `${bullet.trim()}.`}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <Separator className="bg-gray-50" />

            {/* Education Section */}
            <CollapsibleSection title="Education">
              <div className="space-y-6 pb-6">
                {profile.education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Institution Icon */}
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center shadow-sm">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(edu.institution)}&background=f3f4f6&color=374151&size=64`}
                          alt={edu.institution}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Education Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-sm font-bold text-gray-600">{edu.institution}</p>
                        <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                          Class of {edu.year}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">{edu.degree} in {edu.field}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
