
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Hotel, Room } from "@/types/hotel";
import { formatCurrency } from "@/utils/formatCurrency";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingPanelProps {
  hotel: Hotel;
  selectedRoom: string | null;
  setSelectedRoom: (roomId: string) => void;
}

export const BookingPanel = ({ hotel, selectedRoom, setSelectedRoom }: BookingPanelProps) => {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(addDays(new Date(), 2));
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const { toast } = useToast();

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
  
  // Calculate the number of nights between check-in and check-out
  const numberOfNights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

  return (
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
                {formatCurrency(selectedRoomDetails.price, hotel.currency)} x {numberOfNights} nights
              </span>
              <span>
                {formatCurrency(selectedRoomDetails.price * numberOfNights, hotel.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Taxes & fees (10%)</span>
              <span>
                {formatCurrency(selectedRoomDetails.price * numberOfNights * 0.1, hotel.currency)}
              </span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span>
                {formatCurrency(selectedRoomDetails.price * numberOfNights * 1.1, hotel.currency)}
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
  );
};
