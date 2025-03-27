import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, CartComponent],
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isCartOpen = signal(false);

  constructor(public cartService: CartService) {}

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
    if (this.isMenuOpen()) {
      this.isCartOpen.set(false);
    }
  }

  toggleCart(): void {
    this.isCartOpen.update((value) => !value);
    if (this.isCartOpen()) {
      this.isMenuOpen.set(false);
    }
  }
}
