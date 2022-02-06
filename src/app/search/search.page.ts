import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksApiService } from '../books-api.service';
import { Book, Favourites } from '../models/books';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchForm: FormGroup;
  books: Book[];
  favourites: Favourites[];
  currentUser: string;

  constructor(private fb: FormBuilder,
              private storage: Storage,
              private toastService: ToastService,
              private firebaseService: FirebaseService,
              private api: BooksApiService) { }

  ngOnInit() {
    this.firebaseService.getFavouritesList().subscribe(x => {
      this.favourites = x;
    });
    this.storage.get('loggedUser').then(x => {
      this.currentUser = x;
    });
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
  }

  search() {
    if (this.searchForm.valid) {
      this.api.searchBooks(this.searchForm.controls.search.value).subscribe(x => {
        this.books = x.books;
      });
    }
  }

  addToFavourites(isbn: string) {
    const match = this.books.find(book => book.isbn13 === isbn);
    const index = this.books.indexOf(match);
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
    const book = this.books.find(w => w.isbn13 === isbn);
    const index = this.books.indexOf(book);
    if (match !== undefined) {
      this.firebaseService.deleteFavourite(match.key);
      this.toastService.presentToast('This book is removed from your favourites');
    }
  }
}
