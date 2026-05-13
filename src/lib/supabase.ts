import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WoodOption {
  name: string;
  price_modifier: number;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  category: string;
  in_stock: boolean;
  stock_quantity: number;
  featured: boolean;
  images: string[];
  wood_options: WoodOption[];
  color_options: ColorOption[];
  dimensions: Dimensions;
  materials: string[];
  created_at: string;
  updated_at: string;
}
