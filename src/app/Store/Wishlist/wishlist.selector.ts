import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.reducer';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectAllWishlist = createSelector(
  selectWishlistState,
  (state) => state.items
);