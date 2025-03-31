
import { Hotel } from "@/types/hotel";
import { formatCurrency } from "@/utils/formatCurrency";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const loadImage = async () => {
      try {
        // Check if it's a full URL (from sample data)
        if (hotel.images && hotel.images.length > 0 && hotel.images[0]?.startsWith('http')) {
          setImageUrl(hotel.images[0]);
          return;
        }
        
        // Check if there's a storage path in images array
        if (hotel.images && hotel.images.length > 0 && hotel.images[0]) {
          const { data } = supabase.storage.from('hotels').getPublicUrl(hotel.images[0]);
          if (data?.publicUrl) {
            setImageUrl(data.publicUrl);
            return;
          }
        }
        
        // Check if there's a direct image_url
        if (hotel.image_url) {
          if (hotel.image_url.startsWith('http')) {
            setImageUrl(hotel.image_url);
            return;
          } else {
            const { data } = supabase.storage.from('hotels').getPublicUrl(hotel.image_url);
            if (data?.publicUrl) {
              setImageUrl(data.publicUrl);
              return;
            }
          }
        }
        
        // Fallback to a reliable placeholder
        setImageUrl('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000');
      } catch (error) {
        console.error("Error loading image:", error);
        setImageUrl('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000');
      }
    };
    
    loadImage();
  }, [hotel.images, hotel.image_url]);

  // Reliable fallback image in case everything else fails
  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000';

  return (
    <Link to={`/hotel/${hotel.id}`} className="block group">
      <div className="hotel-card h-full">
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={imageUrl || fallbackImage}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loops
              target.src = fallbackImage;
            }}
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
