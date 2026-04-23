import { createClient } from '@supabase/supabase-js';

export class SupabaseService {
  private static client: any = null;

  private static getClient() {
    // 1. Singleton pattern: return existing client if available
    if (this.client) return this.client;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // 2. THE SHIELD: Prevents Vercel from crashing during build
    // It checks if URL is missing or doesn't start with http
    if (!url || !url.startsWith('http') || !key) {
      console.warn("Supabase bypass: Build phase or missing keys.");
      return null;
    }

    try {
      this.client = createClient(url, key, {
        auth: { persistSession: false }
      });
      return this.client;
    } catch (e) {
      return null;
    }
  }

  static async uploadImage(file: File, path: string): Promise<string> {
    const client = this.getClient();
    if (!client) throw new Error("Cloud Storage not connected. Check environment variables.");

    const { data, error } = await client
      .storage
      .from('images')
      .upload(path, file);

    if (error) throw error;

    return client.storage.from('images').getPublicUrl(data.path).data.publicUrl;
  }

  static async getUserData(userId: string) {
    const client = this.getClient();
    if (!client) throw new Error("Database not connected.");

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
    if (!client) throw new Error("Database not connected.");

    const { data, error } = await client
      .from('users')
      .update(updates)
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}
