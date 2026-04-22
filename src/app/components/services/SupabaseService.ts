import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class SupabaseService {
  static async uploadImage(file: File, path: string): Promise<string> {
    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(path, file);

    if (error) {
      throw error;
    }

    return supabase.storage.from('images').getPublicUrl(data.path).data.publicUrl;
  }

  static async getUserData(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  static async updateUser(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}
