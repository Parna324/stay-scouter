
import { supabase } from "@/integrations/supabase/client";

export const setupStorageBucket = async () => {
  try {
    // Check if the bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const hotelsBucketExists = buckets?.some(bucket => bucket.name === 'hotels');
    
    if (!hotelsBucketExists) {
      // Create the bucket directly
      const { data, error } = await supabase.storage.createBucket('hotels', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (error) {
        console.error("Failed to create 'hotels' storage bucket:", error);
      } else {
        console.log("Created 'hotels' bucket successfully:", data);
        
        // Set bucket as public
        const { error: policyError } = await supabase.storage.from('hotels').createSignedUrl(
          'dummy.txt',
          60
        );
        
        if (policyError && policyError.message !== "The resource was not found") {
          console.error("Error setting up bucket policy:", policyError);
        }
      }
    }
  } catch (error) {
    console.error("Error setting up storage bucket:", error);
  }
};
