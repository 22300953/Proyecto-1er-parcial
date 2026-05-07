import { Component, OnDestroy, OnInit, signal } from '@angular/core';

interface Slide {
  src: string;
  title: string;
  subtitle?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = signal(0);
  slides: Slide[] = [
    { src: '/assets/pastel1.jpeg', title: 'Pasteles artesanales', subtitle: 'Hechos a mano cada mañana' },
    { src: '/assets/pastel2.jpeg', title: 'Sabores que enamoran', subtitle: 'Recetas tradicionales con un toque moderno' },
    { src: '/assets/pastel3.jpeg', title: 'Para cada ocasión', subtitle: 'Cumpleaños, bodas y momentos especiales' },
    { src: '/assets/pastel4.jpeg', title: 'Ingredientes premium', subtitle: 'Calidad en cada bocado' },
    { src: '/assets/pastel5.jpeg', title: 'Diseños únicos', subtitle: 'Personalizamos tu pastel ideal' },
    { src: '/assets/chocoflan.webp', title: 'Chocoflan', subtitle: 'El clásico irresistible' },
    { src: '/assets/chocofresa.png', title: 'Choco fresa', subtitle: 'Una combinación perfecta' },
  ];

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly autoplayMs = 5000;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.slides.length);
  }

  previous() {
    this.currentIndex.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }

  pauseAutoplay() {
    this.stopAutoplay();
  }

  resumeAutoplay() {
    this.startAutoplay();
  }

  private startAutoplay() {
    this.stopAutoplay();
    this.intervalId = setInterval(() => this.next(), this.autoplayMs);
  }

  private stopAutoplay() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
