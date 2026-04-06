import { createReducer, on } from '@ngrx/store';
import * as WishlistActions from './wishlist.action';
import { WishlistItem } from '../../Models/wishlist';

export interface WishlistState {
  items: WishlistItem[];
  error: any;
}

export const initialState: WishlistState = {
  items: [],
  error: null
};

export const wishlistReducer = createReducer(
  initialState,
  on(WishlistActions.loadWishlistSuccess, (state, { items }) => ({ ...state, items })),
  on(WishlistActions.addToWishlistSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(WishlistActions.removeFromWishlistSuccess, (state, { itemId }) => ({
    ...state,
    items: state.items.filter(i => i.id !== itemId)
  }))
);