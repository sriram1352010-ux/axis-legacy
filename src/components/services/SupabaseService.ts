import { createClient } from '@supabase/supabase-js';

export class SupabaseService {
  /**
   * Uploads an image to Supabase Storage.
   * Only executes in the browser to prevent build-time crashes.
   */
  static async uploadImage(file: File, path: string): Promise<string> {
    // 1. Only initialize inside the method, only in the browser
    if (typeof window === 'undefined') return ""; 

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Safety check for environment variables
    if (!url || !url.startsWith('http') || !key) {
      throw new Error("Supabase configuration missing or invalid.");
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(path, file);

    if (error) throw error;

    return supabase.storage.from('images').getPublicUrl(data.path).data.publicUrl;
  }

  /**
   * Fetches user profile data from the 'users' table.
   */
  static async getUserData(userId: string) {
    if (typeof window === 'undefined') return null;
    
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Updates user profile data.
   */
  static async updateUser(userId: string, updates: any) {
    if (typeof window === 'undefined') return null;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}
