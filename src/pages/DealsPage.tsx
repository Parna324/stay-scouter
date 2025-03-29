
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hotels } from "@/data/hotels";
import { formatCurrency } from "@/utils/formatCurrency";
import { CalendarClock, MapPin, Tag, Timer } from "lucide-react";
import { Link } from "react-router-dom";

const DealsPage = () => {
  // In a real app, we would fetch deals from the backend
  // For now, we'll simulate this by applying discounts to our hotel data
  const specialOffers = hotels.slice(0, 4).map(hotel => ({
    ...hotel,
    discountPercent: 20,
    discountedPrice: hotel.price * 0.8,
    expiryDate: "2023-12-31"
  }));
  
  const weekendGetaways = hotels.slice(4, 8).map(hotel => ({
    ...hotel,
    discountPercent: 15,
    discountedPrice: hotel.price * 0.85,
    expiryDate: "2023-12-15"
  }));
  
  const luxuryDeals = hotels.slice(7, 10).map(hotel => ({
    ...hotel,
    discountPercent: 10,
    discountedPrice: hotel.price * 0.9,
    expiryDate: "2023-12-30"
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Exclusive Hotel Deals
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
            Limited-time offers on premium accommodations worldwide
          </p>
          
          <Tabs defaultValue="special" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="special">Special Offers</TabsTrigger>
                <TabsTrigger value="weekend">Weekend Getaways</TabsTrigger>
                <TabsTrigger value="luxury">Luxury Deals</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="special">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {specialOffers.map(hotel => (
                  <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-2/5 relative">
                        <img 
                          src={hotel.images[0]} 
                          alt={hotel.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {hotel.discountPercent}% OFF
                        </div>
                      </div>
                      <div className="md:w-3/5 p-6 flex flex-col">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {hotel.location.city}, {hotel.location.country}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                            {hotel.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm mb-4">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Timer className="h-4 w-4 mr-1" />
                              <span>Limited time offer</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <CalendarClock className="h-4 w-4 mr-1" />
                              <span>Expires: {hotel.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {formatCurrency(hotel.discountedPrice, hotel.currency)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                              / night
                            </span>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {formatCurrency(hotel.price, hotel.currency)}
                            </div>
                          </div>
                          <Link to={`/hotel/${hotel.id}`}>
                            <Button className="bg-hotel-600 hover:bg-hotel-700">
                              View Deal
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Special Offers Terms & Conditions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                  Get 20% off selected hotels worldwide. Booking period: now until December 31, 2023. 
                  Stay period: now until March 31, 2024. Blackout dates may apply and offers are 
                  subject to availability at the time of booking.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="weekend">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {weekendGetaways.map(hotel => (
                  <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-2/5 relative">
                        <img 
                          src={hotel.images[0]} 
                          alt={hotel.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Weekend Special
                        </div>
                      </div>
                      <div className="md:w-3/5 p-6 flex flex-col">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {hotel.location.city}, {hotel.location.country}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                            {hotel.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm mb-4">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Tag className="h-4 w-4 mr-1" />
                              <span>{hotel.discountPercent}% off weekend stays</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {formatCurrency(hotel.discountedPrice, hotel.currency)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                              / night
                            </span>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {formatCurrency(hotel.price, hotel.currency)}
                            </div>
                          </div>
                          <Link to={`/hotel/${hotel.id}`}>
                            <Button className="bg-hotel-600 hover:bg-hotel-700">
                              View Deal
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Weekend Getaway Terms & Conditions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                  Save 15% on weekend stays (Friday and Saturday nights) at participating hotels.
                  Booking period: now until December 15, 2023. Stay period: now until February 28, 2024.
                  Minimum 2-night stay required. Subject to availability.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="luxury">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {luxuryDeals.map(hotel => (
                  <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-2/5 relative">
                        <img 
                          src={hotel.images[0]} 
                          alt={hotel.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Luxury Escape
                        </div>
                      </div>
                      <div className="md:w-3/5 p-6 flex flex-col">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {hotel.location.city}, {hotel.location.country}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                            {hotel.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm mb-4">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Tag className="h-4 w-4 mr-1" />
                              <span>Complimentary breakfast & spa credit</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {formatCurrency(hotel.discountedPrice, hotel.currency)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                              / night
                            </span>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {formatCurrency(hotel.price, hotel.currency)}
                            </div>
                          </div>
                          <Link to={`/hotel/${hotel.id}`}>
                            <Button className="bg-hotel-600 hover:bg-hotel-700">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Luxury Deals Terms & Conditions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                  Enjoy 10% off our luxury hotel collection plus exclusive benefits including daily 
                  breakfast and $100 spa credit per stay. Booking period: now until December 30, 2023. 
                  Stay period: now until April 30, 2024. Minimum 3-night stay required.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealsPage;
