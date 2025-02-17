import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './app/store/cart/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './app/store/cart/cart.effects';
import { ProductsEffects } from './app/store/products/products.effects';
import { productsReducer } from './app/store/products/products.reducer';
import { alertReducer } from './app/store/alerts/alerts.reducer';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore({
        cart: cartReducer,
		products: productsReducer,
		alerts: alertReducer
    }),
    provideEffects([CartEffects, ProductsEffects]), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
]
});
