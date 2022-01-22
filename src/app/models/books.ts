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
  favourites: boolean;
}

export interface Favourites {
  userUid: string;
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  favourites: boolean;
}
