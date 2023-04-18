export interface IProduct {
  id: number;
  title: string;
  brand: string;
  thumbnail: string;
  price: number;
  category: string;
  description: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  images: string[];
}
