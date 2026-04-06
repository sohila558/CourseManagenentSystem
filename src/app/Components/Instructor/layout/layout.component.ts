import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../Store/Auth/auth.selector';
import { logout } from '../../../Store/Auth/auth.action';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [AsyncPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  private _store = inject(Store);
  private _router = inject(Router);

  user$ = this._store.select(selectCurrentUser);

  onLogout() {
    this._store.dispatch(logout()); 
    this._router.navigate(['/auth']);
  }
}
