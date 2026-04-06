import { createAction, props } from '@ngrx/store';
import { WishlistItem } from '../../Models/wishlist';

export const loadWishlist = createAction('[Wishlist] Load', props<{ userId: string }>());
export const loadWishlistSuccess = createAction('[Wishlist] Load Success', props<{ items: WishlistItem[] }>());
export const loadWishlistFailure = createAction('[Wishlist] Load Failure', props<{ error: any }>());

export const addToWishlist = createAction('[Wishlist] Add', props<{ item: WishlistItem }>());
export const addToWishlistSuccess = createAction('[Wishlist] Add Success', props<{ item: WishlistItem }>());

export const removeFromWishlist = createAction('[Wishlist] Remove', props<{ itemId: string }>());
export const removeFromWishlistSuccess = createAction('[Wishlist] Remove Success', props<{ itemId: string }>());