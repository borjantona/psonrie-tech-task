import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { IAppState } from './store/app.state';
import { initCart } from './store/cart/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HeaderComponent],
})
export class AppComponent {
  constructor(private store: Store<IAppState>) {
	let userId = (localStorage.getItem('userId')) ? +localStorage.getItem('userId')! : 2;
	localStorage.setItem('userId', userId.toString());
	this.store.dispatch(initCart({ userId }));
  }
}
