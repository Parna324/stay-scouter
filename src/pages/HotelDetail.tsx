
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hotels } from "@/data/hotels";
import { Hotel } from "@/types/hotel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImageGallery } from "@/components/hotel-detail/ImageGallery";
import { HotelHeader } from "@/components/hotel-detail/HotelHeader";
import { HotelOverview } from "@/components/hotel-detail/HotelOverview";
import { RoomsList } from "@/components/hotel-detail/RoomsList";
import { AmenitiesList } from "@/components/hotel-detail/AmenitiesList";
import { ReviewsList } from "@/components/hotel-detail/ReviewsList";
import { BookingPanel } from "@/components/hotel-detail/BookingPanel";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <HotelHeader hotel={hotel} />
          
          <ImageGallery images={hotel.images} hotelName={hotel.name} />
          
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
                  <HotelOverview hotel={hotel} />
                </TabsContent>
                
                <TabsContent value="rooms" className="pt-6">
                  <RoomsList 
                    rooms={hotel.rooms} 
                    selectedRoom={selectedRoom} 
                    setSelectedRoom={setSelectedRoom}
                    currency={hotel.currency}
                  />
                </TabsContent>
                
                <TabsContent value="amenities" className="pt-6">
                  <AmenitiesList hotel={hotel} />
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-6">
                  <ReviewsList hotel={hotel} />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Panel */}
            <div className="lg:row-start-1 lg:col-start-3">
              <BookingPanel 
                hotel={hotel}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;
