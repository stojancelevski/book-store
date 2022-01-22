import { Component, OnInit } from '@angular/core';
import { BooksApiService } from '../books-api.service';
import { Book, Favourites } from '../models/books';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage-angular';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: Book[];
  favourites: Favourites[];

  constructor(private api: BooksApiService,
              private toastService: ToastService,
              private firebaseService: FirebaseService,
              private storage: Storage) { }

  ngOnInit() {
    this.firebaseService.getFavouritesList().subscribe(x => {
      this.favourites = x;
      this.api.getBooks().subscribe(y => {
        this.books = y.books;
        this.books.forEach(book => {
          const item = this.favourites.find(f => f.isbn13 === book.isbn13);
          book.favourites = !!item;
        });
      });
    });
  }

  addToFavourites(isbn: string) {
    this.storage.get('loggedUser').then(x => {
      const match = this.books.find(book => book.isbn13 === isbn);
      this.firebaseService.createFavourite(
        {
          title: match.title,
          subtitle: match.subtitle,
          isbn13: match.isbn13,
          price: match.price,
          image: match.image,
          url: match.url,
          favourites: true,
          userId: x
        });
      this.toastService.presentToast('This book is added to your favourites');
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
