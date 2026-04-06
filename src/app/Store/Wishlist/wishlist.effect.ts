import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import * as WishlistActions from './wishlist.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class WishlistEffects {
  private actions$ = inject(Actions);
  private _wishlistService = inject(WishlistService);

  loadWishlist$ = createEffect(() => this.actions$.pipe(
    ofType(WishlistActions.loadWishlist),
    mergeMap(({ userId }) => this._wishlistService.getWishlist(userId).pipe(
      map(items => WishlistActions.loadWishlistSuccess({ items })),
      catchError(error => of(WishlistActions.loadWishlistFailure({ error })))
    ))
  ));

  addWishlist$ = createEffect(() => this.actions$.pipe(
    ofType(WishlistActions.addToWishlist),
    mergeMap(({ item }) => this._wishlistService.addToWishlist(item).pipe(
      map(newItem => WishlistActions.addToWishlistSuccess({ item: newItem }))
    ))
  ));

  removeWishlist$ = createEffect(() => this.actions$.pipe(
    ofType(WishlistActions.removeFromWishlist),
    mergeMap(({ itemId }) => this._wishlistService.removeFromWishlist(itemId).pipe(
      map(() => WishlistActions.removeFromWishlistSuccess({ itemId }))
    ))
  ));
}