import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  },
  {
    path: 'book-details/:id',
    loadChildren: () => import('../book-details/book-details.module').then(m => m.BookDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {
}
