import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSignal = signal<Product[]>([
    {
      id: 1,
      name: 'Fall Limited Edition Sneakers',
      company: 'SNEAKER COMPANY',
      description:
        "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
      price: 125.0,
      originalPrice: 250.0,
      discount: 50,
      images: [
        'assets/images/image-product-1.jpg',
        'assets/images/image-product-2.jpg',
        'assets/images/image-product-3.jpg',
        'assets/images/image-product-4.jpg',
      ],
      thumbnails: [
        'assets/images/image-product-1-thumbnail.jpg',
        'assets/images/image-product-2-thumbnail.jpg',
        'assets/images/image-product-3-thumbnail.jpg',
        'assets/images/image-product-4-thumbnail.jpg',
      ],
    },
  ]);

  // Public readonly signal
  public products = this.productsSignal.asReadonly();

  constructor() {}

  getProduct(id: number): Product | undefined {
    return this.productsSignal().find((product) => product.id === id);
  }
}
