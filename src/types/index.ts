// Tipos principales para la aplicación VETA FINA
// Este archivo define todas las interfaces y tipos utilizados en la aplicación

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  images: string[];
  description: string;
  category: 'sofa' | 'mesa' | 'otro';
  inStock: boolean;
  materials: Material[];
  colors: Color[];
  featured?: boolean;
  defaultMaterial?: string;
}

export interface Material {
  id: string;
  name: string;
  priceModifier: number; // Multiplicador del precio base (ej: 1.2 = +20%)
  description: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
  priceModifier: number; // Modificador adicional por color especial
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedMaterial: string;
  selectedColor: string;
  finalPrice: number;
}

export interface ContactInfo {
  whatsapp: string;
  email: string;
  address: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
  };
}