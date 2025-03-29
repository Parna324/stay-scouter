
import { Hotel } from '../types/hotel';

export const hotels: Hotel[] = [
  {
    id: "nyc-plaza",
    name: "The Plaza Hotel",
    location: {
      city: "New York",
      state: "New York",
      country: "USA",
      address: "768 5th Ave, New York, NY 10019",
      coordinates: {
        latitude: 40.7645,
        longitude: -73.9744
      }
    },
    price: 599,
    currency: "USD",
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        user: {
          id: "u1",
          name: "Jennifer A.",
          avatar: "https://randomuser.me/api/portraits/women/12.jpg"
        },
        rating: 5,
        comment: "Incredible location and service. The room was immaculate and the staff went above and beyond.",
        date: "2023-05-15"
      },
      {
        id: "r2",
        user: {
          id: "u2",
          name: "Michael T.",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        rating: 4,
        comment: "Classic New York luxury. Would definitely stay again for a special occasion.",
        date: "2023-04-22"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1000",
      "https://images.unsplash.com/photo-1508253578933-20b529302151?q=80&w=1000"
    ],
    description: "Experience timeless elegance at The Plaza, a landmark luxury hotel that has been the accommodation of choice for world leaders, dignitaries, captains of industry, Broadway legends, and Hollywood royalty.",
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Room Service", "Concierge", "Restaurant", "Bar", "Swimming Pool"],
    rooms: [
      {
        id: "plaza-deluxe",
        name: "Deluxe King Room",
        price: 599,
        capacity: 2,
        description: "Elegant room with king-sized bed and city views",
        amenities: ["King Bed", "Flat-screen TV", "Mini Bar", "Safe", "Luxury Bathroom"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"],
        available: true
      },
      {
        id: "plaza-suite",
        name: "Plaza Suite",
        price: 1299,
        capacity: 4,
        description: "Spacious suite with separate living area and panoramic city views",
        amenities: ["King Bed", "Sofa Bed", "Dining Area", "Butler Service", "Luxury Bathroom"],
        images: ["https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1000"],
        available: true
      }
    ],
    featured: true
  },
  {
    id: "london-ritz",
    name: "The Ritz London",
    location: {
      city: "London",
      country: "United Kingdom",
      address: "150 Piccadilly, St. James's, London W1J 9BR",
      coordinates: {
        latitude: 51.5073,
        longitude: -0.1422
      }
    },
    price: 675,
    currency: "GBP",
    rating: 4.9,
    reviews: [
      {
        id: "r3",
        user: {
          id: "u3",
          name: "Sarah P.",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg"
        },
        rating: 5,
        comment: "Absolutely outstanding in every way. The afternoon tea is a must!",
        date: "2023-06-18"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000",
      "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?q=80&w=1000",
      "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?q=80&w=1000"
    ],
    description: "A byword for luxury and sophistication, The Ritz London is one of the world's most prestigious hotels. Located in the heart of London, it offers stunning rooms and world-famous afternoon tea.",
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Room Service", "Concierge", "Restaurant", "Bar", "Afternoon Tea"],
    rooms: [
      {
        id: "ritz-superior",
        name: "Superior King Room",
        price: 675,
        capacity: 2,
        description: "Elegant room with king-sized bed and period furnishings",
        amenities: ["King Bed", "Flat-screen TV", "Mini Bar", "Safe", "Marble Bathroom"],
        images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000"],
        available: true
      }
    ],
    featured: true
  },
  {
    id: "dubai-burj",
    name: "Burj Al Arab",
    location: {
      city: "Dubai",
      country: "United Arab Emirates",
      address: "Jumeirah St, Dubai, United Arab Emirates",
      coordinates: {
        latitude: 25.1412,
        longitude: 55.1852
      }
    },
    price: 1499,
    currency: "AED",
    rating: 4.9,
    reviews: [
      {
        id: "r4",
        user: {
          id: "u4",
          name: "Ahmed M.",
          avatar: "https://randomuser.me/api/portraits/men/42.jpg"
        },
        rating: 5,
        comment: "Unparalleled luxury and service. The suite was breathtaking with incredible views.",
        date: "2023-03-10"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1573843981713-13042e54cd49?q=80&w=1000",
      "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?q=80&w=1000",
      "https://images.unsplash.com/photo-1547364072-a743d509571c?q=80&w=1000"
    ],
    description: "Standing on its own island, Burj Al Arab is one of the most iconic hotels in the world. All accommodations are luxurious suites spanning two floors with incredible views of the Arabian Gulf.",
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Room Service", "Private Beach", "Concierge", "Multiple Restaurants", "Bar", "Swimming Pool"],
    rooms: [
      {
        id: "burj-deluxe",
        name: "Deluxe Suite",
        price: 1499,
        capacity: 2,
        description: "Two-story suite with stunning ocean views and butler service",
        amenities: ["King Bed", "Living Room", "Butler Service", "Jacuzzi", "Luxury Bathroom Products"],
        images: ["https://images.unsplash.com/photo-1573843981713-13042e54cd49?q=80&w=1000"],
        available: true
      }
    ],
    featured: true
  },
  {
    id: "paris-george",
    name: "Four Seasons Hotel George V",
    location: {
      city: "Paris",
      country: "France",
      address: "31 Avenue George V, 75008 Paris, France",
      coordinates: {
        latitude: 48.8689,
        longitude: 2.3009
      }
    },
    price: 995,
    currency: "EUR",
    rating: 4.8,
    reviews: [
      {
        id: "r5",
        user: {
          id: "u5",
          name: "Sophie L.",
          avatar: "https://randomuser.me/api/portraits/women/62.jpg"
        },
        rating: 5,
        comment: "The perfect Parisian experience. The floral arrangements alone are worth the visit!",
        date: "2023-07-22"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1556784344-ad913a77cfdc?q=80&w=1000",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1000"
    ],
    description: "Just steps from the Champs-Elysées, this historic hotel offers an exquisite art collection, Michelin-starred restaurants, and unparalleled service in the heart of Paris.",
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Room Service", "Concierge", "Multiple Restaurants", "Bar", "Swimming Pool"],
    rooms: [
      {
        id: "george-superior",
        name: "Superior Room",
        price: 995,
        capacity: 2,
        description: "Elegant room with Parisian-inspired décor and luxury amenities",
        amenities: ["King Bed", "Flat-screen TV", "Mini Bar", "Safe", "Marble Bathroom"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000"],
        available: true
      }
    ],
    featured: true
  },
  {
    id: "tokyo-imperial",
    name: "Imperial Hotel Tokyo",
    location: {
      city: "Tokyo",
      country: "Japan",
      address: "1-1-1 Uchisaiwaicho, Chiyoda City, Tokyo 100-8558, Japan",
      coordinates: {
        latitude: 35.6736,
        longitude: 139.7601
      }
    },
    price: 42000,
    currency: "JPY",
    rating: 4.7,
    reviews: [
      {
        id: "r6",
        user: {
          id: "u6",
          name: "Takashi K.",
          avatar: "https://randomuser.me/api/portraits/men/62.jpg"
        },
        rating: 5,
        comment: "Perfect blend of traditional Japanese hospitality with modern amenities. Excellent location.",
        date: "2023-02-15"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?q=80&w=1000",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1000",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1000"
    ],
    description: "With over 120 years of history, the Imperial Hotel Tokyo blends Japanese cultural heritage with modern luxury. Centrally located near the Imperial Palace and Ginza shopping district.",
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Room Service", "Concierge", "Multiple Restaurants", "Bar", "Indoor Pool"],
    rooms: [
      {
        id: "imperial-standard",
        name: "Standard Room",
        price: 42000,
        capacity: 2,
        description: "Comfortable room with modern amenities and traditional Japanese touches",
        amenities: ["Twin Beds", "Flat-screen TV", "Mini Bar", "Safe", "En-suite Bathroom"],
        images: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?q=80&w=1000"],
        available: true
      }
    ],
    featured: false
  },
  {
    id: "mumbai-taj",
    name: "Taj Mahal Palace",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      address: "Apollo Bunder, Mumbai, Maharashtra 400001, India",
      coordinates: {
        latitude: 18.9220,
        longitude: 72.8332
      }
    },
    price: 22000,
    currency: "INR",
    rating: 4.9,
    reviews: [
      {
        id: "r7",
        user: {
          id: "u7",
          name: "Priya S.",
          avatar: "https://randomuser.me/api/portraits/women/72.jpg"
        },
        rating: 5,
        comment: "Historical luxury at its finest. The service and attention to detail is unmatched.",
        date: "2023-01-12"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1606047557332-9f525fca5b34?q=80&w=1000",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1000",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000"
    ],
    description: "An architectural marvel, the Taj Mahal Palace is Mumbai's first harbor landmark and has played host to kings, dignitaries, and celebrities since 1903.",
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Room Service", "Concierge", "Multiple Restaurants", "Bar", "Swimming Pool"],
    rooms: [
      {
        id: "taj-luxury",
        name: "Luxury Room",
        price: 22000,
        capacity: 2,
        description: "Elegant room with city or sea views and traditional Indian touches",
        amenities: ["King Bed", "Flat-screen TV", "Mini Bar", "Safe", "Marble Bathroom"],
        images: ["https://images.unsplash.com/photo-1606047557332-9f525fca5b34?q=80&w=1000"],
        available: true
      }
    ],
    featured: false
  },
  {
    id: "sydney-opera",
    name: "Park Hyatt Sydney",
    location: {
      city: "Sydney",
      state: "New South Wales",
      country: "Australia",
      address: "7 Hickson Road, The Rocks, Sydney NSW 2000, Australia",
      coordinates: {
        latitude: -33.8568,
        longitude: 151.2122
      }
    },
    price: 950,
    currency: "AUD",
    rating: 4.8,
    reviews: [
      {
        id: "r8",
        user: {
          id: "u8",
          name: "James W.",
          avatar: "https://randomuser.me/api/portraits/men/72.jpg"
        },
        rating: 5,
        comment: "Incredible views of the Opera House and harbor. Worth every penny for that alone!",
        date: "2023-08-05"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=1000"
    ],
    description: "Located between the Sydney Opera House and Harbour Bridge, Park Hyatt Sydney offers a spectacular location and unparalleled luxury in the heart of this vibrant city.",
    amenities: ["Free WiFi", "Spa", "Fitness Center", "Room Service", "Concierge", "Restaurant", "Bar", "Rooftop Pool"],
    rooms: [
      {
        id: "hyatt-opera",
        name: "Opera View Room",
        price: 950,
        capacity: 2,
        description: "Contemporary room with floor-to-ceiling windows offering Opera House views",
        amenities: ["King Bed", "Flat-screen TV", "Mini Bar", "Safe", "Luxury Bathroom"],
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000"],
        available: true
      }
    ],
    featured: false
  },
  {
    id: "bali-four",
    name: "Four Seasons Resort Bali at Sayan",
    location: {
      city: "Ubud",
      country: "Indonesia",
      address: "Sayan, Ubud, Bali 80571, Indonesia",
      coordinates: {
        latitude: -8.5069,
        longitude: 115.2625
      }
    },
    price: 775,
    currency: "USD",
    rating: 4.9,
    reviews: [
      {
        id: "r9",
        user: {
          id: "u9",
          name: "Emma T.",
          avatar: "https://randomuser.me/api/portraits/women/42.jpg"
        },
        rating: 5,
        comment: "A magical experience in the jungle. The villa with private pool was heaven on earth.",
        date: "2023-04-18"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000",
      "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?q=80&w=1000"
    ],
    description: "Nestled in the jungle above the Ayung River, this resort offers a truly immersive experience with rice terraces, lily ponds, and an award-winning spa.",
    amenities: ["Free WiFi", "Spa", "Yoga Classes", "Room Service", "Concierge", "Restaurant", "Bar", "Infinity Pool"],
    rooms: [
      {
        id: "bali-villa",
        name: "One-Bedroom Villa",
        price: 775,
        capacity: 2,
        description: "Private villa with pool and rice terrace views",
        amenities: ["King Bed", "Private Pool", "Outdoor Shower", "Terrace", "Luxury Bathroom"],
        images: ["https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000"],
        available: true
      }
    ],
    featured: false
  },
  {
    id: "maldives-soneva",
    name: "Soneva Jani",
    location: {
      city: "Noonu Atoll",
      country: "Maldives",
      address: "Medhufaru Island, Noonu Atoll, Maldives",
      coordinates: {
        latitude: 5.9423,
        longitude: 73.3500
      }
    },
    price: 2150,
    currency: "USD",
    rating: 5.0,
    reviews: [
      {
        id: "r10",
        user: {
          id: "u10",
          name: "David C.",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        rating: 5,
        comment: "Paradise found. The water villa with slide into the ocean is an unforgettable experience.",
        date: "2023-03-25"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1000",
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1000",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1000"
    ],
    description: "Set on a private lagoon in the Maldives, Soneva Jani offers overwater villas with retractable roofs for stargazing, private pools, and direct ocean access.",
    amenities: ["Free WiFi", "Spa", "Water Sports", "Room Service", "Concierge", "Multiple Restaurants", "Bar", "Private Pools"],
    rooms: [
      {
        id: "soneva-overwater",
        name: "Overwater Villa with Slide",
        price: 2150,
        capacity: 2,
        description: "Stunning overwater villa with private pool, slide, and retractable roof",
        amenities: ["King Bed", "Private Pool", "Water Slide", "Retractable Roof", "Direct Ocean Access"],
        images: ["https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1000"],
        available: true
      }
    ],
    featured: true
  }
];
