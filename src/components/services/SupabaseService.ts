import { createClient } from '@supabase/supabase-js';

export class SupabaseService {
  /**
   * THE SHIELD: Only initializes the client if in a browser and keys are valid.
   * This prevents the "Invalid supabaseUrl" error during Vercel builds.
   */
  static async uploadImage(file: File, path: string): Promise<string> {
    // 1. Exit if server-side (build phase) or environment variables are missing
    if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return ""; 
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // 2. Final verification to satisfy the Supabase internal validator
    if (!url.startsWith('http')) return "";

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
    if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return null;
    }
    
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!url.startsWith('http')) return null;

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
    if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return null;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!url.startsWith('http')) return null;

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
