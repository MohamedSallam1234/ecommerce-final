import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ImageGalleryComponent,
    LightboxComponent,
  ],
})
export class ProductDetailsComponent implements OnInit {
  product = signal<Product | undefined>(undefined);
  quantity = signal<number>(0);
  showLightbox = signal<boolean>(false);
  lightboxInitialIndex = signal<number>(0);

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Get the first product for demo
    const product = this.productService.getProduct(1);
    if (product) {
      this.product.set(product);
    }
  }

  decrementQuantity(): void {
    if (this.quantity() > 0) {
      this.quantity.update((qty) => qty - 1);
    }
  }

  incrementQuantity(): void {
    this.quantity.update((qty) => qty + 1);
  }

  addToCart(): void {
    const currentProduct = this.product();
    const currentQuantity = this.quantity();

    if (currentProduct && currentQuantity > 0) {
      this.cartService.addToCart(currentProduct, currentQuantity);
      this.quantity.set(0);
    }
  }

  openLightbox(index: number): void {
    this.lightboxInitialIndex.set(index);
    this.showLightbox.set(true);
  }

  closeLightbox(): void {
    this.showLightbox.set(false);
  }
}
