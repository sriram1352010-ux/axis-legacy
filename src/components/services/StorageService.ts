import { createClient } from '@supabase/supabase-js';

// These use the variables from your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class StorageService {
  private static BUCKET_NAME = 'axis-assets';

  /**
   * Uploads a File object to Supabase Storage
   * @param file The image file from an <input>
   * @param userId Optional ID to organize folders by user
   */
  static async uploadImage(file: File, userId: string = 'guest'): Promise<string> {
    // Generate a unique path: guest/1714000000-photo.jpg
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload Error:', error.message);
      throw new Error('Failed to upload image to cloud.');
    }

    // Return the public URL so you can display it in your UI
    const { data: urlData } = supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  /**
   * Gets a list of all images for a specific user
   */
  static async getUserImages(userId: string = 'guest') {
    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .list(userId);

    if (error) throw error;
    return data;
  }

  /**
   * Deletes an image from the cloud
   */
  static async deleteImage(path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .remove([path]);

    if (error) throw error;
  }
}