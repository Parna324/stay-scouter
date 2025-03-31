
import { Wifi, ShowerHead, Dumbbell, Utensils, Coffee, CheckCircle2 } from "lucide-react";

interface AmenityIconProps {
  amenity: string;
}

export const AmenityIcon = ({ amenity }: AmenityIconProps) => {
  const amenityIcons: Record<string, JSX.Element> = {
    "Free WiFi": <Wifi className="h-5 w-5" />,
    "Spa": <ShowerHead className="h-5 w-5" />,
    "Fitness Center": <Dumbbell className="h-5 w-5" />,
    "Restaurant": <Utensils className="h-5 w-5" />,
    "Room Service": <Coffee className="h-5 w-5" />,
  };

  return amenityIcons[amenity] || <CheckCircle2 className="h-5 w-5 text-hotel-600 dark:text-hotel-400" />;
};
