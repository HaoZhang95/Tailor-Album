import { HomePage } from './../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ConfigProvider } from '../../providers/config/config';
/**
 * Generated class for the UploadMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-upload-media',
    templateUrl: 'upload-media.html',
})
export class UploadMediaPage {

    public hasMedia = false;
    //file: File;
    media = {
        title: '',
        description: '',
    };
    public uploadStatus: String;

    private mediaSrc: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public config:ConfigProvider,
        public actionSheetCtrl: ActionSheetController, public tools: ToolsProvider, public httpService: HttpServiceProvider,
        private camera: Camera, private transfer: FileTransfer, private file: File) {
    }

    chooseFile() {
        console.log(this.tools.getUserInfo());

        if (this.tools.getUserInfo()) {

            let actionSheet = this.actionSheetCtrl.create({
                enableBackdropDismiss: true,
                buttons: [
                    {
                        text: 'Take a picture',
                        icon: 'camera',
                        handler: () => {
                            this.doCamera();
                        }
                    }, {
                        text: 'From gallery',
                        icon: 'images',
                        handler: () => {
                            this.doGallery();
                        }
                    }
                ]
            });
            actionSheet.present();

        } else {
            this.navCtrl.push(LoginPage, { 'comeFrom': 'uploadPage' });
            return;
        }

    }

    doCamera() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,

            sourceType: this.camera.PictureSourceType.CAMERA,
            // mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            targetWidth: 300,
            targetHeight: 250
        }

        this.camera.getPicture(options).then((imageData) => {
            console.log(imageData);

            this.mediaSrc = imageData;
            console.log(this.mediaSrc);

            this.hasMedia = true;
        }, (err) => {
            // Handle error
        });

    }

    doGallery() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,

            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 300,
            targetHeight: 250
        }

        this.camera.getPicture(options).then((imageData) => {
            this.mediaSrc = imageData;
            this.hasMedia = true;
        }, (err) => {
            this.tools.showToast("Add image and title before uploading.");
            return;
        });
    }

    doCameraUpload() {

        if (this.mediaSrc && this.media.title) {
            this.doUpload(this.mediaSrc);
        } else {
            this.tools.showToast("Add image and title before uploading.");
            return;
        }


    }
    doUpload(src) {

        const fileTransfer: FileTransferObject = this.transfer.create();


        //alert(this.media);
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'name.jpg',
            mimeType: 'image/jpeg',
            httpMethod: "POST",
            params: {
                title: this.media.title,
                description: this.media.description,
            },
            headers: {
                "x-access-token": this.tools.getUserInfo().token
            }

        }


        var api = this.config.baseUrl + "/media";

        fileTransfer.upload(src, encodeURI(api), options)
            .then((data) => {
                // success
                this.navCtrl.popTo(HomePage);
            }, (err) => {
                // error
                this.tools.showToast("Failed, try again.");
            })

    }

}
