import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    // Use SSR for dynamic routes (avoids needing getPrerenderParams for routes with params)
    renderMode: RenderMode.Server
  }
];
