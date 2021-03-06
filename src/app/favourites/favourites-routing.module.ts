import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouritesPage } from './favourites.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritesPage
  },
  {
    path: 'book-details/:id',
    loadChildren: () => import('../book-details/book-details.module').then(m => m.BookDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritesPageRoutingModule {}
