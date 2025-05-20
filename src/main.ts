import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { tokenInterceptor } from './app/core/interceptors/token.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from './environments/environment';

import { addIcons } from 'ionicons';
import { chevronForwardOutline, filterOutline, mapOutline, addOutline, listOutline, settingsOutline, closeOutline } from 'ionicons/icons';

addIcons({
  'chevron-forward-outline': chevronForwardOutline,
  'filter-outline' : filterOutline,
  'map-outline' : mapOutline,
  'add-outline' : addOutline,
  'list-outline' : listOutline,
  'settings-outline' : settingsOutline,
  'close-outline' : closeOutline
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(
      withInterceptors([tokenInterceptor]) 
    ),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
