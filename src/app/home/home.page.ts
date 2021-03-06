import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksApiService } from '../books-api.service';
import { Book, Favourites } from '../models/books';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage-angular';
import { ToastService } from '../toast.service';
import { Subscription } from 'rxjs';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  books: Book[];
  favourites: Favourites[];
  currentUser: string;
  subscription: Subscription;

  constructor(private api: BooksApiService,
              private toastService: ToastService,
              private firebaseService: FirebaseService,
              private platform: Platform,
              private storage: Storage) {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnInit() {
    this.storage.get('loggedUser').then(x => {
      this.currentUser = x;
    });
    this.firebaseService.getFavouritesList().subscribe(x => {
      this.favourites = x;
      this.api.getBooks().subscribe(y => {
        this.books = y.books;
      });
    });
  }

  addToFavourites(isbn: string) {
    const match = this.books.find(book => book.isbn13 === isbn);
    this.firebaseService.createFavourite(
      {
        title: match.title,
        subtitle: match.subtitle,
        isbn13: match.isbn13,
        price: match.price,
        image: match.image,
        url: match.url,
        userUid: this.currentUser
      });
    this.toastService.presentToast('This book is added to your favourites');
  }

  itIsInFavorites(isbn: string) {
    return this.favourites.find(x => x.isbn13 === isbn && x.userUid === this.currentUser);
  }

  removeFavourites(isbn: string) {
    const match = this.favourites.find(w => w.isbn13 === isbn && w.userUid === this.currentUser);
    if (match !== undefined) {
      this.firebaseService.deleteFavourite(match.key);
      this.toastService.presentToast('This book is removed from your favourites');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
