
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, MinusCircle, Upload } from "lucide-react";
import { useState } from "react";
import { createHotel } from "@/services/hotelService";
import { useNavigate } from "react-router-dom";
import { Hotel } from "@/types/hotel";
import { supabase } from "@/integrations/supabase/client";

const AddHotelPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>(['Free WiFi']);
  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    country: "",
    address: "",
    price: "",
    currency: "USD",
    description: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
  const handleAddAmenity = () => {
    setAmenities([...amenities, '']);
  };
  
  const handleRemoveAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };
  
  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    setAmenities(newAmenities);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      
      const newImageUrls = files.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newImageUrls]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Filter out empty amenities
      const filteredAmenities = amenities.filter(amenity => amenity.trim() !== '');
      
      // Upload images to Supabase Storage
      let uploadedImageUrls: string[] = [];
      
      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `hotel-images/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('hotels')
            .upload(filePath, image);
            
          if (uploadError) {
            throw uploadError;
          }
          
          const { data } = supabase.storage.from('hotels').getPublicUrl(filePath);
          uploadedImageUrls.push(data.publicUrl);
        }
      }
      
      // Prepare hotel data
      const hotelData: Omit<Hotel, "id" | "rating" | "reviews" | "rooms" | "created_at"> = {
        name: formData.name,
        location: {
          city: formData.city,
          state: formData.state || undefined,
          country: formData.country,
          address: formData.address,
        },
        price: parseFloat(formData.price),
        currency: formData.currency,
        description: formData.description,
        amenities: filteredAmenities,
        images: uploadedImageUrls,
      };
      
      // Create hotel in Supabase
      await createHotel(hotelData);
      
      toast({
        title: "Hotel Added",
        description: "Your hotel listing has been successfully created!",
      });
      
      // Redirect to hotels page
      navigate("/hotels");
      
    } catch (error: any) {
      toast({
        title: "Error Adding Hotel",
        description: error.message || "An error occurred while adding the hotel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Add New Hotel
          </h1>
          
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Hotel Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter hotel name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Full address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price per Night</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.currency}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="AUD">AUD</option>
                        <option value="INR">INR</option>
                        <option value="AED">AED</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your hotel"
                      className="min-h-[100px]"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                
                <div className="space-y-2">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={amenity}
                        onChange={(e) => handleAmenityChange(index, e.target.value)}
                        placeholder="Enter amenity"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveAmenity(index)}
                        disabled={amenities.length <= 1}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddAmenity}
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Amenity
                  </Button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Images</h2>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label htmlFor="images" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Click to upload images
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        PNG, JPG or WEBP (max 5MB each)
                      </span>
                    </Label>
                  </div>
                  
                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Uploaded ${index + 1}`}
                            className="h-24 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  type="submit" 
                  className="w-full bg-hotel-600 hover:bg-hotel-700"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Hotel"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddHotelPage;
