"use client";

import { useState } from "react";
import { Header } from "@/components/Header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Will be used for filtering profiles
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      
      {/* Main content area */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Alumni Network
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Connecting professionals across industries
          </p>
        </div>

        {/* Show current search if any */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            Showing results for: <span className="font-medium text-gray-900">&ldquo;{searchQuery}&rdquo;</span>
          </div>
        )}

        {/* Placeholder for filters and profile cards */}
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">
            Filters and profile cards will be added here
          </p>
        </div>
      </main>
    </div>
  );
}
