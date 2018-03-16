import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/**
 * 引入camera需要执行两条命令,而不是其中一条,npm和ionic都需要执行
 */
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageProvider } from '../storage/storage';

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

    constructor(public toastCtrl: ToastController, private camera: Camera, public storage:StorageProvider) {

    }

    getUserInfo() {
        return this.storage.getItem('userinfo');
    }

    uploadFromGallery() {
        const cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            mediaType: this.camera.MediaType.PICTURE,
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000
        }
    }

    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top',
            showCloseButton:true,
            closeButtonText:"Close",
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}
