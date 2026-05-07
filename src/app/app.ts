import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, TopbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App{
  protected readonly title = signal('miproyecto');
  protected readonly currentYear = new Date().getFullYear();
}

