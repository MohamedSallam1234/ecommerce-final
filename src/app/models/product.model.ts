export interface Product {
  id: number;
  name: string;
  company: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  thumbnails: string[];
}
