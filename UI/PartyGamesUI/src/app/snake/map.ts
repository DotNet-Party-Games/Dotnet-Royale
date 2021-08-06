import { AppModule } from '../app.module'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
  
    // custom stuff...
    const meta = document.createElement('meta');
    meta.setAttribute('content', "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
    meta.setAttribute('name', 'viewport');
    const head = document.head;
    head.appendChild(meta);
  
    // Otherwise, log the boot error
  }).catch(err => console.error(err));