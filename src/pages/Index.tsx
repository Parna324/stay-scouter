
import Footer from "@/components/Footer";
import HotelCard from "@/components/HotelCard";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hotels } from "@/data/hotels";
import { Hotel } from "@/types/hotel";
import { formatCurrency } from "@/utils/formatCurrency";
import { MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Reliable fallback image in case everything else fails
const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000';

// Define unique destination images for top cities
const destinationImages: Record<string, string> = {
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000",
  "London": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000",
  "Paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
  "Tokyo": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000",
  "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000",
  "Sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000",
  "Rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000",
  "Mumbai": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1000",
  "Ubud": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
  "Noonu Atoll": "https://images.unsplash.com/photo-1573843981713-13042e54cd49?q=80&w=1000",
};

// Secondary destination images as fallbacks
const secondaryDestinationImages: string[] = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000",
  "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1000",
  "https://images.unsplash.com/photo-1524675053444-52c3ca294ad2?q=80&w=1000",
  "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?q=80&w=1000",
  "https://images.unsplash.com/photo-1533587052057-2530d3b33d91?q=80&w=1000",
];

const Index = () => {
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);
  const [topDestinations, setTopDestinations] = useState<{city: string, country: string, count: number}[]>([]);
  
  useEffect(() => {
    // Get featured hotels
    const featured = hotels.filter(hotel => hotel.featured);
    setFeaturedHotels(featured);
    
    // Get top destinations
    const destinations = hotels.reduce<{[key: string]: {city: string, country: string, count: number}}>(
      (acc, hotel) => {
        const key = `${hotel.location.city}-${hotel.location.country}`;
        if (!acc[key]) {
          acc[key] = {
            city: hotel.location.city,
            country: hotel.location.country,
            count: 0
          };
        }
        acc[key].count += 1;
        return acc;
      },
      {}
    );
    
    const topDest = Object.values(destinations)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
      
    setTopDestinations(topDest);
  }, []);

  // Get destination image based on city name
  const getDestinationImage = (city: string, index: number): string => {
    // First check if we have a predefined image for this city
    if (destinationImages[city]) {
      return destinationImages[city];
    }
    
    // If no predefined image, use one from the secondary images array with the index
    if (secondaryDestinationImages.length > 0) {
      const secondaryIndex = index % secondaryDestinationImages.length;
      return secondaryDestinationImages[secondaryIndex];
    }
    
    // Last resort fallback
    return `https://source.unsplash.com/featured/?${city},landmark&w=600&h=400&sig=${Date.now() + index}`;
  };

  // Handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loops
    target.src = fallbackImage;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="relative h-[600px] bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920')"
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 animate-fade-in">
              Find Your Perfect Stay Anywhere
            </h1>
            <p className="text-xl text-white text-center mb-8 max-w-2xl animate-fade-in" style={{animationDelay: "0.2s"}}>
              Discover and book amazing hotels around the world with exclusive deals and personalized recommendations
            </p>
            <div className="w-full max-w-5xl animate-fade-in" style={{animationDelay: "0.4s"}}>
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Hotels Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {featuredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/hotels">
              <Button className="bg-hotel-600 hover:bg-hotel-700">
                View All Hotels
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Top Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {topDestinations.map((destination, index) => (
              <Link 
                key={`${destination.city}-${destination.country}`}
                to={`/hotels?location=${destination.city}`}
                className="relative h-64 rounded-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={getDestinationImage(destination.city, index)} 
                  alt={destination.city} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={handleImageError}
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white">{destination.city}</h3>
                  <p className="text-white/80">{destination.country}</p>
                  <p className="text-sm text-white/70 mt-1">{destination.count} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Deals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Exclusive Deals</h2>
          <Tabs defaultValue="special" className="w-full mt-6">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="special">Special Offers</TabsTrigger>
                <TabsTrigger value="weekend">Weekend Getaways</TabsTrigger>
                <TabsTrigger value="luxury">Luxury Stays</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="special" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hotels.slice(0, 3).map(hotel => (
                  <div key={hotel.id} className="hotel-card">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={hotel.images[0] || fallbackImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        20% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          {hotel.location.city}, {hotel.location.country}
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(hotel.price * 0.8, hotel.currency)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          / night
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 line-through ml-2">
                          {formatCurrency(hotel.price, hotel.currency)}
                        </span>
                      </div>
                      <Link to={`/hotel/${hotel.id}`}>
                        <Button className="w-full mt-3 bg-hotel-600 hover:bg-hotel-700">
                          View Deal
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="weekend" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hotels.slice(3, 6).map(hotel => (
                  <div key={hotel.id} className="hotel-card">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Weekend Special
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          {hotel.location.city}, {hotel.location.country}
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(hotel.price * 0.85, hotel.currency)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          / night
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 line-through ml-2">
                          {formatCurrency(hotel.price, hotel.currency)}
                        </span>
                      </div>
                      <Link to={`/hotel/${hotel.id}`}>
                        <Button className="w-full mt-3 bg-hotel-600 hover:bg-hotel-700">
                          View Deal
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="luxury" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hotels.slice(6, 9).map(hotel => (
                  <div key={hotel.id} className="hotel-card">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-purple-500 text-white px-2 py-1 rounded text-xs">
                        Luxury Deal
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          {hotel.location.city}, {hotel.location.country}
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(hotel.price * 0.9, hotel.currency)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          / night
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 line-through ml-2">
                          {formatCurrency(hotel.price, hotel.currency)}
                        </span>
                      </div>
                      <Link to={`/hotel/${hotel.id}`}>
                        <Button className="w-full mt-3 bg-hotel-600 hover:bg-hotel-700">
                          View Deal
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Why Choose StayScouter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-hotel-100 dark:bg-hotel-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-hotel-600 dark:text-hotel-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Best Price Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We promise the best rates for your stay. If you find a better price elsewhere, we'll match it.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-hotel-100 dark:bg-hotel-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hotel-600 dark:text-hotel-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Verified Reviews</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our hotel reviews come from real guests who have stayed and experienced the properties.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-hotel-100 dark:bg-hotel-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hotel-600 dark:text-hotel-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our customer support team is available around the clock to assist with any questions or issues.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
