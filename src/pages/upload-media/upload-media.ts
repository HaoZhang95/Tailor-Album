import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoginPage } from '../login/login';

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

    file: File;
    media = {
        title: '',
        description: '',
    };
    public uploadStatus: String;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController, public tools: ToolsProvider, public httpService: HttpServiceProvider) {
    }

    setFile(evt) {
        this.file = evt.target.files[0];
        console.log(evt.target.files[0]);
    }
    uploadMedia() {
        console.log(this.media);
        // create FormData-object
        const formData = new FormData();
        // add title and description to FormData object
        formData.append('title', this.media.title);
        formData.append('description', this.media.description);

        // add file to FormData object
        formData.append('file', this.file);

        // send FormData object to API
        this.httpService.doPostUpload(formData).subscribe(response => {
            console.log(response);
            this.uploadStatus = response.message;
        }, (err => {
            this.navCtrl.push(LoginPage);
        }));
    }

    chooseFile() {
        let actionSheet = this.actionSheetCtrl.create({
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: 'Take a picture',
                    icon: 'camera',
                    handler: () => {
                        this.tools.uploadFromCamera();
                    }
                }, {
                    text: 'From gallery',
                    icon: 'images',
                    handler: () => {
                        this.tools.uploadFromGallery();
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
