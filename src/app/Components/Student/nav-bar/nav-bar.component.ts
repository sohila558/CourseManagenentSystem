import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  private _authService = inject(AuthService);
  private _router = inject(Router);

  isLoggedIn(): boolean {
    return !!this._authService.getUserFromStorage();
  }

  getUserRole(): string | null {
    const user = this._authService.getUserFromStorage();
    return user ? user.role : null;
  }

  logout() {
    this._authService.logout(); 
    this._router.navigate(['/auth']);
  }
}
