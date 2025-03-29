
import { supabase } from "@/integrations/supabase/client";

export const setupStorageBucket = async () => {
  try {
    // Check if the bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const hotelsBucketExists = buckets?.some(bucket => bucket.name === 'hotels');
    
    if (!hotelsBucketExists) {
      // Call our edge function to create the bucket
      const response = await fetch(
        `${window.location.origin}/functions/v1/create-storage-bucket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        }
      );
      
      if (!response.ok) {
        console.error("Failed to create 'hotels' storage bucket");
      }
    }
  } catch (error) {
    console.error("Error setting up storage bucket:", error);
  }
};
