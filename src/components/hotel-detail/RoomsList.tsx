
import { Room } from "@/types/hotel";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface RoomsListProps {
  rooms: Room[];
  selectedRoom: string | null;
  setSelectedRoom: (roomId: string) => void;
  currency: string;
}

export const RoomsList = ({ rooms, selectedRoom, setSelectedRoom, currency }: RoomsListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Available Rooms</h2>
      
      <div className="space-y-6">
        {rooms.map((room) => (
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
                      {formatCurrency(room.price, currency)}
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
  );
};
