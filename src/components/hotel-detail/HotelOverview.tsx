
import { Hotel } from "@/types/hotel";
import { CheckCircle2 } from "lucide-react";
import { AmenityIcon } from "./AmenityIcon";

interface HotelOverviewProps {
  hotel: Hotel;
}

export const HotelOverview = ({ hotel }: HotelOverviewProps) => {
  return (
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
              <AmenityIcon amenity={amenity} />
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
  );
};
