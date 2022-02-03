import { Component, OnInit } from '@angular/core';
import { BooksApiService } from '../books-api.service';
import { SingleBook } from '../models/books';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  bookDetails: SingleBook;
  isHome: boolean;
  isSearch: boolean;
  stores = ['Ohrid store 1', 'Ohrid store 2', 'Ohrid store 3', 'Ohrid store 4'];


  constructor(private api: BooksApiService, private iab: InAppBrowser, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isHome = this.router.url.includes('home');
    this.isSearch = this.router.url.includes('search');
    this.route.paramMap.subscribe(x => {
      const isbn = x.get('id');
      this.api.searchByIsbn(isbn).subscribe(y => {
        this.bookDetails = y;
        this.bookDetails.bookstore = this.random(this.stores, this.stores.length);
      });
    });
  }

  random(items, length) {
    return items[Math.floor((Math.random() * length))];
  }

  openLink(url: string) {
    this.iab.create(url, '_blank');
  }
}
