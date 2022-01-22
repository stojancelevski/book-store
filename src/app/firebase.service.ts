import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Favourites } from './models/books';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  favouritesRef: AngularFireList<Favourites[]> = null;
  favouritesUrl = '/favourites';

  constructor(private fire: AngularFireDatabase) {
    this.favouritesRef = fire.list(this.favouritesUrl);
  }

  createFavourite(value) {
    this.favouritesRef.push(value);
  }

  getFavourites() {
    return this.favouritesRef;
  }

  getFavouritesList(): Observable<any[]> {
    return this.getFavourites().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }


  updateFavourite(key: string, value: any) {
    return this.favouritesRef.update(key, value);
  }

  deleteFavourite(key: string): Promise<any> {
    return this.favouritesRef.remove(key);
  }
}
