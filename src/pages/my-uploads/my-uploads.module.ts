import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyUploadsPage } from './my-uploads';

@NgModule({
  declarations: [
    MyUploadsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyUploadsPage),
  ],
})
export class MyUploadsPageModule {}
