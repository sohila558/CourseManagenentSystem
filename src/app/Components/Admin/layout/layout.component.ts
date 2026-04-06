import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavBarComponent } from '../../Shared/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
