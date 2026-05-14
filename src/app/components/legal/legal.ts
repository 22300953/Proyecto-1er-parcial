import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

const TITLES: Record<string, string> = {
  terminos: 'Términos y Condiciones',
  privacidad: 'Aviso de Privacidad',
};

function mdToHtml(md: string): string {
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  const lines = html.split('\n');
  let out = '';
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('- ')) {
      if (!inList) {
        out += '<ul>';
        inList = true;
      }
      out += `<li>${trimmed.slice(2)}</li>`;
      continue;
    }

    if (inList && trimmed !== '') {
      out += '</ul>';
      inList = false;
    }

    if (trimmed === '') {
      continue;
    }

    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul>') || trimmed.startsWith('<li>') || trimmed.startsWith('</ul>')) {
      out += trimmed;
    } else {
      out += `<p>${trimmed}</p>`;
    }
  }

  if (inList) out += '</ul>';
  return out;
}

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal.html',
  styleUrls: ['./legal.css'],
})
export class LegalComponent implements OnInit, OnDestroy {
  title = signal('');
  contentHtml = signal<SafeHtml | null>(null);
  loading = signal(true);
  error = signal(false);
  private paramSub!: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params) => {
      const docType = params['docType'] ?? 'terminos';
      const docName = docType === 'privacidad' ? 'aviso-de-privacidad' : 'terminos-y-condiciones';
      this.title.set(TITLES[docType] ?? 'Documento Legal');
      this.loading.set(true);
      this.error.set(false);

      this.http.get(`/legal/${docName}.md`, { responseType: 'text' })
        .subscribe({
          next: (text) => {
            const html = mdToHtml(text);
            this.contentHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
            this.loading.set(false);
          },
          error: () => {
            this.error.set(true);
            this.loading.set(false);
          }
        });
    });
  }

  ngOnDestroy() {
    this.paramSub?.unsubscribe();
  }
}
