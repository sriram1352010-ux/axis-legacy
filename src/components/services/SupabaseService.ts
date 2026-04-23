import { createClient } from '@supabase/supabase-js';

export class SupabaseService {
  // Helper to get the client only when needed
  private static getClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      // During build, we return null instead of crashing
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });
  }

  static async uploadImage(file: File, path: string): Promise<string> {
    const client = this.getClient();
    if (!client) throw new Error("Supabase not configured");

    const { data, error } = await client
      .storage
      .from('images')
      .upload(path, file);

    if (error) throw error;

    return client.storage.from('images').getPublicUrl(data.path).data.publicUrl;
  }

  static async getUserData(userId: string) {
    const client = this.getClient();
    if (!client) throw new Error("Supabase not configured");

    const { data, error } = await client
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUser(userId: string, updates: any) {
    const client = this.getClient();
    if (!client) throw new Error("Supabase not configured");

    const { data, error } = await client
      .from('users')
      .update(updates)
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}
