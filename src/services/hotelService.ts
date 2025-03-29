
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/types/hotel";

export async function getAllHotels() {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }

  return data;
}

export async function getHotelById(id: string) {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching hotel:", error);
    throw error;
  }

  return data;
}

export async function createHotel(hotel: Omit<Hotel, "id" | "rating" | "reviews" | "rooms" | "created_at">) {
  // First get the session to ensure we have the user ID
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("hotels")
    .insert({
      name: hotel.name,
      location: hotel.location.address,
      description: hotel.description,
      price_per_night: hotel.price,
      currency: hotel.currency,
      amenities: hotel.amenities,
      image_url: hotel.images[0] || "",
      user_id: userId
    })
    .select();

  if (error) {
    console.error("Error creating hotel:", error);
    throw error;
  }

  return data;
}
