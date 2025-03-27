import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class LightboxComponent {
  @Input() images: string[] = [];
  @Input() thumbnails: string[] = [];
  @Input() initialIndex = 0;
  @Output() close = new EventEmitter<void>();

  selectedIndex = signal<number>(0);

  ngOnChanges(): void {
    this.selectedIndex.set(this.initialIndex);
  }

  selectImage(index: number): void {
    this.selectedIndex.set(index);
  }

  nextImage(): void {
    this.selectedIndex.update((index) => (index + 1) % this.images.length);
  }

  previousImage(): void {
    this.selectedIndex.update(
      (index) => (index - 1 + this.images.length) % this.images.length
    );
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
