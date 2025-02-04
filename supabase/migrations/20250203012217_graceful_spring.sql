/*
  # Create media storage bucket

  1. Storage
    - Creates a new public bucket for storing media files
    - Enables public access for viewing uploaded files
    - Sets up policies for authenticated users to upload files

  2. Security
    - Enables RLS policies for secure access
    - Allows public read access
    - Restricts uploads to authenticated users
*/

-- Create a new storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);

-- Allow public access to files
CREATE POLICY "Media files are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Allow users to update their own uploads
CREATE POLICY "Users can update their own media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media' AND owner = auth.uid());