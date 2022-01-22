import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Favourites } from '../models/books';
import { ToastService } from '../toast.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favourites: Favourites[];

  constructor(private firebaseService: FirebaseService,
              private storage: Storage,
              private toastService: ToastService) { }

  ngOnInit() {
    this.firebaseService.getFavouritesList().subscribe(x => {
      this.favourites = x;
    });
  }

  removeFavourites(isbn: string) {
    const match = this.favourites.find(w => w.isbn13 === isbn);
    if (match !== undefined) {
      this.firebaseService.deleteFavourite(match.userUid);
      this.toastService.presentToast('This book is removed from your favourites');
    }
  }
}
