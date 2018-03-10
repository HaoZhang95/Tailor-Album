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


    uploadFromCamera() {

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

            // 官方文档
            // quality: 100,
            // destinationType: this.camera.DestinationType.DATA_URL,
            // encodingType: this.camera.EncodingType.JPEG,
            // mediaType: this.camera.MediaType.PICTURE

            // github
            // allowEdit: false,
            // saveToPhotoAlbum: true,
            // targetWidth: 720,
            // targetHeight: 720,
            // cameraDirection: this.camera.Direction.BACK,
            // sourceType: this.camera.PictureSourceType.CAMERA,
            // destinationType: this.camera.DestinationType.FILE_URI,
        }
        // this.camera.getPicture(cameraOptions)
        //     .then(file_uri => {
        //         this.mediaSrc = file_uri
        //     },
        //     err => console.log(err));
    }

    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top',
            showCloseButton:true,
            closeButtonText:"Close",
            // cssClass: "background: linear-gradient(360deg, #4E5EFC  ,#4EE7FC)"
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}
