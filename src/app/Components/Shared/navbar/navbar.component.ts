import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
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
    if (this._authService.logout) { 
        this._authService.logout(); 
    } else {
        localStorage.removeItem('userToken');
    }
    this._router.navigate(['/auth']);
  }
}
