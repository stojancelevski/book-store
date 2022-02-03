export interface Books {
  error: string;
  total: string;
  books: Book[];
}

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface SingleBook {
  title: string;
  bookstore: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  favourites: boolean;
  error: string;
  authors: string;
  publisher: string;
  isbn10: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
}

export interface Favourites {
  key: string;
  userUid: string;
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  favourites: boolean;
}
