import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localStorageKey = 'sneakers-cart';
  private cartItemsSignal = signal<CartItem[]>([]);

  // Computed signals
  public cartItems = this.cartItemsSignal.asReadonly();
  public cartCount = computed(() =>
    this.cartItemsSignal().reduce((total, item) => total + item.quantity, 0)
  );
  public cartTotal = computed(() =>
    this.cartItemsSignal().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  constructor() {
    this.loadCartFromLocalStorage();

    // Set up effect to automatically save cart changes to localStorage
    effect(() => {
      const items = this.cartItemsSignal();
      localStorage.setItem(this.localStorageKey, JSON.stringify(items));
    });
  }

  getCartTotal(): number {
    return this.cartTotal();
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.cartItemsSignal.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        // Update existing item
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...items, { product, quantity }];
      }
    });
  }

  removeFromCart(productId: number): void {
    this.cartItemsSignal.update((items) =>
      items.filter((item) => item.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItemsSignal.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }

  private loadCartFromLocalStorage(): void {
    try {
      const savedCart = localStorage.getItem(this.localStorageKey);
      if (savedCart) {
        this.cartItemsSignal.set(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
    }
  }
}
