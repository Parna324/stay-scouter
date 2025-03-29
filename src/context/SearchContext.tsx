
import React, { createContext, useContext, useState } from "react";
import { SearchParams } from "../types/hotel";

type SearchContextType = {
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  clearSearchParams: () => void;
};

const initialSearchParams: SearchParams = {
  location: "",
  checkIn: "",
  checkOut: "",
  guests: {
    adults: 1,
    children: 0,
  },
  priceRange: {
    min: 0,
    max: 5000,
  },
  amenities: [],
  rating: 0,
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);

  const updateSearchParams = (params: Partial<SearchParams>) => {
    setSearchParams((prev) => ({
      ...prev,
      ...params,
    }));
  };

  const clearSearchParams = () => {
    setSearchParams(initialSearchParams);
  };

  const value = {
    searchParams,
    updateSearchParams,
    clearSearchParams,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
