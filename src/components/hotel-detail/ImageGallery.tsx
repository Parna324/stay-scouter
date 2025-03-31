
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  hotelName: string;
}

const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000';

export const ImageGallery = ({ images, hotelName }: ImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Process images to ensure they all have valid URLs
  const processedImages = images.length > 0 
    ? images.map(img => img.startsWith('http') ? img : fallbackImage)
    : [fallbackImage];
  
  // Handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loops
    target.src = fallbackImage;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="md:col-span-3 h-80 md:h-96 rounded-lg overflow-hidden">
        <img
          src={processedImages[activeImageIndex] || fallbackImage}
          alt={`${hotelName} main`}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-2 h-80 md:h-96">
        {processedImages.map((image, index) => (
          <div 
            key={index}
            className={`h-24 md:h-[30%] rounded-lg overflow-hidden cursor-pointer transition-opacity ${
              index === activeImageIndex ? 'ring-2 ring-hotel-600' : 'hover:opacity-80'
            }`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img
              src={image}
              alt={`${hotelName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
