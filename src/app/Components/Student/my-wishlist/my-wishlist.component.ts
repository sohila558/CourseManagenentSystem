import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../Services/Auth/auth.service';
import { map, Observable } from 'rxjs';
import { loadWishlist, removeFromWishlist } from '../../../Store/Wishlist/wishlist.action';
import { selectAllWishlist } from '../../../Store/Wishlist/wishlist.selector';

@Component({
  selector: 'app-my-wishlist',
  imports: [NavBarComponent, CommonModule, RouterLink],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.css'
})
export class MyWishlistComponent implements OnInit{

  private _store = inject(Store);
  private _authService = inject(AuthService);

  wishlistItems$!: Observable<any[]>;

  ngOnInit(): void {
    const user = this._authService.getUserFromStorage();
    if (user) {
      this._store.dispatch(loadWishlist({ userId: user.id }));

      this.wishlistItems$ = this._store.select(selectAllWishlist).pipe(
        map(items => items.filter(item => item.userId === user.id))
      );
    }
  }

  remove(id: string) {
    if (confirm('Remove from wishlist?')) {
      this._store.dispatch(removeFromWishlist({ itemId: id }));
    }
  }
}
