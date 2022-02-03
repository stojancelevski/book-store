import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, Books, SingleBook } from './models/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {
  url = 'https://api.itbook.store/1.0/new';
  searchUrl = 'https://api.itbook.store/1.0/search/';
  search = 'https://api.itbook.store/1.0/books/';

  constructor(private httpClient: HttpClient) { }

  public getBooks(): Observable<Books> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get<Books>(this.url, {headers});
  }

  public searchBooks(search): Observable<Books> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get<Books>(`${this.searchUrl}${search}`, {headers});
  }

  public searchByIsbn(isbn): Observable<SingleBook> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get<SingleBook>(`${this.search}${isbn}`, {headers});
  }
}

