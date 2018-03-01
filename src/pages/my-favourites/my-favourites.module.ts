import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFavouritesPage } from './my-favourites';

@NgModule({
  declarations: [
    MyFavouritesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFavouritesPage),
  ],
})
export class MyFavouritesPageModule {}
