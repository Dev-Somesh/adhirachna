
-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'Blog Images', true);

-- Create storage policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Create policy to allow anyone to view images
CREATE POLICY "Allow anyone to view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');
