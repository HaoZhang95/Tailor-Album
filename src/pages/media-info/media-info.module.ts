import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaInfoPage } from './media-info';

@NgModule({
  declarations: [
    MediaInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaInfoPage),
  ],
})
export class MediaInfoPageModule {}
