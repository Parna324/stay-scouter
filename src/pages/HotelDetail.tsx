
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hotels } from "@/data/hotels";
import { useToast } from "@/hooks/use-toast";
import { Hotel } from "@/types/hotel";
import { formatCurrency } from "@/utils/formatCurrency";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Star, Users, Wifi, ShowerHead, Utensils, Dumbbell, Coffee, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(addDays(new Date(), 2));
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { toast } = useToast();
  
  const amenityIcons: Record<string, JSX.Element> = {
    "Free WiFi": <Wifi className="h-5 w-5" />,
    "Spa": <ShowerHead className="h-5 w-5" />,
    "Fitness Center": <Dumbbell className="h-5 w-5" />,
    "Restaurant": <Utensils className="h-5 w-5" />,
    "Room Service": <Coffee className="h-5 w-5" />,
  };
  
  useEffect(() => {
    if (id) {
      const foundHotel = hotels.find(h => h.id === id);
      if (foundHotel) {
        setHotel(foundHotel);
        if (foundHotel.rooms && foundHotel.rooms.length > 0) {
          setSelectedRoom(foundHotel.rooms[0].id);
        }
      }
    }
  }, [id]);
  
  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading hotel details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  const selectedRoomDetails = hotel.rooms.find(room => room.id === selectedRoom);
  
  const handleBookNow = () => {
    if (!selectedRoom) {
      toast({
        title: "Please select a room",
        description: "You need to select a room before booking",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would redirect to checkout or process the booking
    toast({
      title: "Booking Successful!",
      description: "Your booking has been confirmed. Check your email for details.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link to="/hotels" className="text-hotel-600 dark:text-hotel-400 hover:underline mb-4 inline-block">
              &larr; Back to Hotels
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {hotel.name}
              </h1>
              <div className="flex items-center mt-2 md:mt-0">
                <div className="flex items-center bg-hotel-50 dark:bg-hotel-900 px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{hotel.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{hotel.location.address}, {hotel.location.city}, {hotel.location.country}</span>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-3 h-80 md:h-96 rounded-lg overflow-hidden">
              <img
                src={hotel.images[activeImageIndex]}
                alt={`${hotel.name} main`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2 h-80 md:h-96">
              {hotel.images.map((image, index) => (
                <div 
                  key={index}
                  className={`h-24 md:h-[30%] rounded-lg overflow-hidden cursor-pointer transition-opacity ${
                    index === activeImageIndex ? 'ring-2 ring-hotel-600' : 'hover:opacity-80'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${hotel.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="w-full">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="rooms" className="flex-1">Rooms</TabsTrigger>
                  <TabsTrigger value="amenities" className="flex-1">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {hotel.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {hotel.amenities.slice(0, 6).map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-hotel-50 dark:bg-hotel-900 flex items-center justify-center mr-3">
                            {amenityIcons[amenity] || <CheckCircle2 className="h-5 w-5 text-hotel-600 dark:text-hotel-400" />}
                          </div>
                          <span className="text-gray-800 dark:text-gray-200">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">Map will be displayed here</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Located in {hotel.location.city}, {hotel.location.country}, this hotel offers convenient access to popular attractions and city center.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="rooms" className="pt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Available Rooms</h2>
                    
                    <div className="space-y-6">
                      {hotel.rooms.map((room) => (
                        <div
                          key={room.id}
                          className={`border rounded-lg p-4 transition-colors ${
                            selectedRoom === room.id ? 'border-hotel-600 dark:border-hotel-400 bg-hotel-50 dark:bg-gray-700' : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
                              <img
                                src={room.images[0]}
                                alt={room.name}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                            <div className="md:w-2/3">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold">{room.name}</h3>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-gray-700 dark:text-gray-300 my-2">
                                {room.description}
                              </p>
                              
                              <div className="flex flex-wrap mt-2 mb-4">
                                {room.amenities.slice(0, 3).map((amenity, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs mr-2 mb-2"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                                {room.amenities.length > 3 && (
                                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs mr-2 mb-2">
                                    +{room.amenities.length - 3} more
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div className="mb-2 sm:mb-0">
                                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(room.price, hotel.currency)}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                    / night
                                  </span>
                                </div>
                                
                                <Button
                                  onClick={() => setSelectedRoom(room.id)}
                                  variant={selectedRoom === room.id ? "default" : "outline"}
                                  className={selectedRoom === room.id ? "bg-hotel-600 hover:bg-hotel-700" : ""}
                                >
                                  {selectedRoom === room.id ? "Selected" : "Select Room"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="pt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Hotel Amenities</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-hotel-50 dark:bg-hotel-900 flex items-center justify-center mr-3">
                            {amenityIcons[amenity] || <CheckCircle2 className="h-5 w-5 text-hotel-600 dark:text-hotel-400" />}
                          </div>
                          <span className="text-gray-800 dark:text-gray-200">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Guest Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-bold text-lg">{hotel.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          ({hotel.reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {hotel.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {review.user.avatar ? (
                                <img
                                  src={review.user.avatar}
                                  alt={review.user.name}
                                  className="h-10 w-10 rounded-full mr-3"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
                                  <span className="text-gray-600 dark:text-gray-300">
                                    {review.user.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium">{review.user.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(review.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1 font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="mt-3 text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Panel */}
            <div className="lg:row-start-1 lg:col-start-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-in / Check-out</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(checkInDate, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={(date) => {
                              if (date) {
                                setCheckInDate(date);
                                setIsCheckInOpen(false);
                                
                                // Ensure check-out is after check-in
                                if (date >= checkOutDate) {
                                  setCheckOutDate(addDays(date, 1));
                                }
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(checkOutDate, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={(date) => {
                              if (date) {
                                setCheckOutDate(date);
                                setIsCheckOutOpen(false);
                              }
                            }}
                            disabled={(date) => date <= checkInDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Guests</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Adults</label>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            disabled={adults <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-3 w-6 text-center">{adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setAdults(Math.min(10, adults + 1))}
                            disabled={adults >= 10}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Children</label>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            disabled={children <= 0}
                          >
                            -
                          </Button>
                          <span className="mx-3 w-6 text-center">{children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setChildren(Math.min(10, children + 1))}
                            disabled={children >= 10}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Selected Room</label>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      {selectedRoomDetails ? (
                        <div>
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{selectedRoomDetails.name}</h4>
                            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded-full">
                              Available
                            </span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Fits up to {selectedRoomDetails.capacity} guests</span>
                          </div>
                          <div className="mt-2">
                            <span className="font-semibold">
                              {formatCurrency(selectedRoomDetails.price, hotel.currency)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/ night</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Please select a room from the Rooms tab
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Price Summary */}
                {selectedRoomDetails && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <h3 className="font-semibold mb-2">Price Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          {formatCurrency(selectedRoomDetails.price, hotel.currency)} x 2 nights
                        </span>
                        <span>
                          {formatCurrency(selectedRoomDetails.price * 2, hotel.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Taxes & fees (10%)</span>
                        <span>
                          {formatCurrency(selectedRoomDetails.price * 2 * 0.1, hotel.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span>Total</span>
                        <span>
                          {formatCurrency(selectedRoomDetails.price * 2 * 1.1, hotel.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={handleBookNow}
                  className="w-full bg-hotel-600 hover:bg-hotel-700"
                  disabled={!selectedRoom}
                >
                  Book Now
                </Button>
                
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;
