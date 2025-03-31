
import { Hotel } from "@/types/hotel";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface HotelHeaderProps {
  hotel: Hotel;
}

export const HotelHeader = ({ hotel }: HotelHeaderProps) => {
  return (
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
  );
};
