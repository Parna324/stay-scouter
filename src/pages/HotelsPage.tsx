import Footer from "@/components/Footer";
import HotelCard from "@/components/HotelCard";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { hotels } from "@/data/hotels";
import { Hotel } from "@/types/hotel";
import { ArrowDownAZ, ArrowUpZA, Filter, SlidersHorizontal, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HotelsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get("location") || "";
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const allAmenities = Array.from(
    new Set(
      hotels.flatMap(hotel => hotel.amenities)
    )
  ).sort();
  
  useEffect(() => {
    let results = [...hotels];
    
    // Filter by location
    if (locationParam) {
      results = results.filter(hotel => 
        hotel.location.city.toLowerCase().includes(locationParam.toLowerCase()) ||
        hotel.location.country.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    
    // Filter by price range
    results = results.filter(hotel => 
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );
    
    // Filter by rating
    if (selectedRating > 0) {
      results = results.filter(hotel => hotel.rating >= selectedRating);
    }
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      results = results.filter(hotel => 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    // Sort hotels
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep the default order (recommended)
        break;
    }
    
    setFilteredHotels(results);
  }, [locationParam, sortBy, priceRange, selectedRating, selectedAmenities]);
  
  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedRating(0);
    setSelectedAmenities([]);
    setSortBy("recommended");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </div>
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {locationParam ? 
                `Hotels in ${locationParam}` : 
                "All Hotels"
              }
              <span className="text-gray-500 dark:text-gray-400 text-lg ml-2">
                ({filteredHotels.length} properties)
              </span>
            </h1>
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            <aside className="hidden md:block w-64 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-4 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={5000}
                        step={100}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}{priceRange[1] === 5000 && '+'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Star Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <button
                            className={`flex items-center px-2 py-1 rounded ${
                              selectedRating === rating
                                ? "bg-hotel-100 dark:bg-hotel-900 text-hotel-600 dark:text-hotel-400"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                          >
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-500 fill-yellow-500"
                              />
                            ))}
                            {Array.from({ length: 5 - rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-gray-300 dark:text-gray-600"
                              />
                            ))}
                            <span className="ml-1">{rating}+</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Amenities</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {allAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityChange(amenity)}
                          />
                          <Label
                            htmlFor={`amenity-${amenity}`}
                            className="ml-2 text-sm font-normal"
                          >
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button onClick={resetFilters} variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </div>
              </div>
            </aside>
            
            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="md:hidden bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                    Close
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Sort by</h4>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={5000}
                        step={100}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}{priceRange[1] === 5000 && '+'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Star Rating</h4>
                    <div className="flex flex-wrap gap-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                          key={rating}
                          className={`flex items-center px-2 py-1 rounded ${
                            selectedRating === rating
                              ? "bg-hotel-100 dark:bg-hotel-900 text-hotel-600 dark:text-hotel-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                        >
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                          {rating}+
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto">
                      {allAmenities.slice(0, 8).map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <Checkbox
                            id={`mobile-${amenity}`}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityChange(amenity)}
                          />
                          <Label
                            htmlFor={`mobile-${amenity}`}
                            className="ml-2 text-sm font-normal"
                          >
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {allAmenities.length > 8 && (
                      <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                        Show more
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={resetFilters} variant="outline" className="flex-1">
                      Reset
                    </Button>
                    <Button 
                      onClick={() => setIsFilterOpen(false)} 
                      className="flex-1 bg-hotel-600 hover:bg-hotel-700"
                    >
                      Show Results
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Hotel Listings */}
            <div className="flex-1">
              {filteredHotels.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search criteria to find more hotels.
                  </p>
                  <Button onClick={resetFilters} className="bg-hotel-600 hover:bg-hotel-700">
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelsPage;
