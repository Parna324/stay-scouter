
import { Hotel } from "@/types/hotel";
import { formatCurrency } from "@/utils/formatCurrency";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <Link to={`/hotel/${hotel.id}`} className="block group">
      <div className="hotel-card h-full">
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hotel.featured && (
            <div className="absolute top-4 left-4 bg-hotel-600 text-white px-2 py-1 rounded text-xs">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-hotel-600 dark:group-hover:text-hotel-400 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center bg-hotel-50 dark:bg-hotel-900 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {hotel.location.city}, {hotel.location.country}
            </span>
          </div>
          
          <div className="mt-3 flex items-baseline">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(hotel.price, hotel.currency)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              / night
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
