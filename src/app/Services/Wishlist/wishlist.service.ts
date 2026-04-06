import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WishlistItem } from '../../Models/wishlist'; // تأكدي من عمل الموديل
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private _http = inject(HttpClient);
  private _baseUrl = 'http://localhost:3000/wishlist'; // غيريه حسب الـ API عندك

  getWishlist(userId: string): Observable<WishlistItem[]> {
    return this._http.get<WishlistItem[]>(`${this._baseUrl}?userId=${userId}`);
  }

  addToWishlist(item: WishlistItem): Observable<WishlistItem> {
    return this._http.post<WishlistItem>(this._baseUrl, item);
  }

  removeFromWishlist(id: string): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${id}`);
  }
}