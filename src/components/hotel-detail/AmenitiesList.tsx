
import { Hotel } from "@/types/hotel";
import { AmenityIcon } from "./AmenityIcon";

interface AmenitiesListProps {
  hotel: Hotel;
}

export const AmenitiesList = ({ hotel }: AmenitiesListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Hotel Amenities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {hotel.amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-hotel-50 dark:bg-hotel-900 flex items-center justify-center mr-3">
              <AmenityIcon amenity={amenity} />
            </div>
            <span className="text-gray-800 dark:text-gray-200">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
