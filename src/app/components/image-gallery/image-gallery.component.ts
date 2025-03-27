import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];
  @Input() thumbnails: string[] = [];
  @Output() openLightbox = new EventEmitter<number>();

  selectedIndex = signal<number>(0);
  private platformId = inject(PLATFORM_ID);

  selectImage(index: number): void {
    this.selectedIndex.set(index);
  }

  showLightbox(): void {
    // Only show lightbox on desktop (screen width > 768px)
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 768) {
      this.openLightbox.emit(this.selectedIndex());
    }
  }

  nextImage(): void {
    this.selectedIndex.update((index) => (index + 1) % this.images.length);
  }

  previousImage(): void {
    this.selectedIndex.update(
      (index) => (index - 1 + this.images.length) % this.images.length
    );
  }
}
