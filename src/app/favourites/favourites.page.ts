import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Favourites } from '../models/books';
import { ToastService } from '../toast.service';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favourites: Favourites[];
  currentUser: string;
  constructor(private firebaseService: FirebaseService,
              private storage: Storage,
              private platform: Platform,
              private toastService: ToastService) {
    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnInit() {
    this.storage.get('loggedUser').then(x => {
      this.currentUser = x;
      this.firebaseService.getFavouritesList().subscribe(x => {
        this.favourites = x.filter(y => y.userUid === this.currentUser);
      });
    });
  }

  removeFavourites(isbn: string) {
    const match = this.favourites.find(w => w.isbn13 === isbn && w.userUid === this.currentUser);
    if (match !== undefined) {
      this.firebaseService.deleteFavourite(match.key);
      this.toastService.presentToast('This book is removed from your favourites');
    }
  }
}
