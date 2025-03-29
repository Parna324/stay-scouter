
export interface Hotel {
  id: string;
  name: string;
  location: {
    city: string;
    state?: string;
    country: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  currency: string;
  rating: number;
  reviews: Review[];
  images: string[];
  description: string;
  amenities: string[];
  rooms: Room[];
  featured?: boolean;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bookings?: Booking[];
}

export interface Booking {
  id: string;
  hotelId: string;
  roomId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  guests: {
    adults: number;
    children: number;
  };
  createdAt: string;
}

export interface SearchParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: {
    adults: number;
    children: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  rating?: number;
}
