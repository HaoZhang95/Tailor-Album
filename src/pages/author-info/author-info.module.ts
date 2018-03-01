import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorInfoPage } from './author-info';

@NgModule({
  declarations: [
    AuthorInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorInfoPage),
  ],
})
export class AuthorInfoPageModule {}
