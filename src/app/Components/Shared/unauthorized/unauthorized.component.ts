import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

  constructor(private _router: Router) {}

  goBack() {
    this._router.navigate(['/']);
  }
}
