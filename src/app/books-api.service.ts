import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Books } from './models/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {
  url = 'https://api.itbook.store/1.0/new';
  searchUrl = 'https://api.itbook.store/1.0/search/test';

  constructor(private httpClient: HttpClient) { }

  public getBooks(): Observable<Books> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get<Books>(this.url, {headers});
  }
}
