
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearch } from "@/context/SearchContext";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { searchParams, updateSearchParams } = useSearch();
  const navigate = useNavigate();
  const [location, setLocation] = useState(searchParams.location || "");
  
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    searchParams.checkIn ? new Date(searchParams.checkIn) : undefined
  );
  
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    searchParams.checkOut ? new Date(searchParams.checkOut) : undefined
  );
  
  const [adults, setAdults] = useState(searchParams.guests?.adults || 1);
  const [children, setChildren] = useState(searchParams.guests?.children || 0);

  const handleSearch = () => {
    updateSearchParams({
      location,
      checkIn: checkInDate ? format(checkInDate, "yyyy-MM-dd") : undefined,
      checkOut: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : undefined,
      guests: {
        adults,
        children,
      },
    });

    navigate("/hotels");
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Where are you going?"
            className="search-input pl-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? (
                  format(checkInDate, "PPP")
                ) : (
                  <span>Check-in</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={(date) => {
                  setCheckInDate(date);
                  setIsCheckInOpen(false);
                  if (!checkOutDate && date) {
                    // Set check-out to day after check-in by default
                    const nextDay = new Date(date);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setCheckOutDate(nextDay);
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? (
                  format(checkOutDate, "PPP")
                ) : (
                  <span>Check-out</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={(date) => {
                  setCheckOutDate(date);
                  setIsCheckOutOpen(false);
                }}
                disabled={(date) => date <= (checkInDate || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex gap-2">
          <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Users className="mr-2 h-4 w-4" />
                {adults} {adults === 1 ? "Adult" : "Adults"}, {children} {children === 1 ? "Child" : "Children"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4 bg-white dark:bg-gray-800" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >
                      -
                    </Button>
                    <span>{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Children</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      -
                    </Button>
                    <span>{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setChildren(children + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => setIsGuestsOpen(false)}
                >
                  Done
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            className="bg-hotel-600 hover:bg-hotel-700 text-white"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
