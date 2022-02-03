import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDetailsPageRoutingModule } from './book-details-routing.module';

import { BookDetailsPage } from './book-details.page';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookDetailsPageRoutingModule
  ],
  declarations: [BookDetailsPage ],
  providers: [InAppBrowser]
})
export class BookDetailsPageModule {}
