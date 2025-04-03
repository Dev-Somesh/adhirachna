
import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  onUploadStart: () => void;
  onUploadComplete: (imageUrl: string) => void;
  onUploadError: (error: Error) => void;
}

const ImageUploader = ({ onUploadStart, onUploadComplete, onUploadError }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `blog/${fileName}`;
    
    try {
      onUploadStart();
      setIsUploading(true);
      
      console.log("Attempting to upload file to Supabase storage...");
      
      // First check if we're authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error("You must be logged in to upload images");
      }
      
      const { error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);
      
      if (error) throw error;
      
      console.log("File uploaded successfully, getting public URL...");
      
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      console.log("Public URL obtained:", data.publicUrl);
      onUploadComplete(data.publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully."
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      onUploadError(error instanceof Error ? error : new Error("Unknown upload error"));
      
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    await uploadImage(file);
  };
  
  return (
    <div className="relative">
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Button type="button" variant="secondary" disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </>
        )}
      </Button>
    </div>
  );
};

export default ImageUploader;
