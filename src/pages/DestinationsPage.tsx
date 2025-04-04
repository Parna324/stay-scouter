
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { hotels } from "@/data/hotels";
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

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState<{
    city: string;
    country: string;
    count: number;
    state?: string;
  }[]>([]);
  
  const [featuredDestinations, setFeaturedDestinations] = useState<{
    city: string;
    country: string;
    count: number;
    state?: string;
  }[]>([]);
  
  useEffect(() => {
    // Group hotels by destination
    const destinationsMap = hotels.reduce<{[key: string]: {
      city: string;
      country: string;
      count: number;
      state?: string;
    }}>(
      (acc, hotel) => {
        const key = `${hotel.location.city}-${hotel.location.country}`;
        if (!acc[key]) {
          acc[key] = {
            city: hotel.location.city,
            country: hotel.location.country,
            state: hotel.location.state,
            count: 0
          };
        }
        acc[key].count += 1;
        return acc;
      },
      {}
    );
    
    const allDestinations = Object.values(destinationsMap).sort((a, b) => 
      a.country === b.country ? a.city.localeCompare(b.city) : a.country.localeCompare(b.country)
    );
    
    setDestinations(allDestinations);
    
    // Set featured destinations (top 3 by hotel count)
    const featured = [...allDestinations].sort((a, b) => b.count - a.count).slice(0, 3);
    setFeaturedDestinations(featured);
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
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Explore Our Destinations
          </h1>
          
          {/* Featured Destinations */}
          <section className="mb-16">
            <h2 className="section-title text-center mb-10">Featured Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDestinations.map((dest, index) => (
                <div 
                  key={`${dest.city}-${dest.country}`}
                  className="relative h-80 rounded-xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/40 transition-colors"></div>
                  <img 
                    src={getDestinationImage(dest.city, index)} 
                    alt={dest.city} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">{dest.city}</h3>
                    <p className="text-white text-lg mb-6">{dest.country}</p>
                    <p className="text-white/90 mb-6">{dest.count} properties</p>
                    <Link to={`/hotels?location=${dest.city}`}>
                      <Button className="bg-white/90 hover:bg-white text-gray-900 border-0">
                        Explore Hotels
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* All Destinations */}
          <section>
            <h2 className="section-title text-center mb-10">All Destinations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest, index) => (
                <Link 
                  key={`${dest.city}-${dest.country}-${index}`}
                  to={`/hotels?location=${dest.city}`}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow group"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={getDestinationImage(dest.city, index + 100)} 
                      alt={dest.city} 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-hotel-600 dark:group-hover:text-hotel-400 transition-colors">
                      {dest.city}
                      {dest.state && <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">({dest.state})</span>}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{dest.country}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                      {dest.count} {dest.count === 1 ? 'property' : 'properties'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationsPage;
