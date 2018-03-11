import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { ToolsProvider } from '../../providers/tools/tools';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { MediaInfoPage } from '../media-info/media-info';

/**
 * Generated class for the MyUploadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-uploads',
    templateUrl: 'my-uploads.html',
})
export class MyUploadsPage {

    public list;
    public uploads = [];
    public MediaInfoPage = MediaInfoPage;
    public username;

    constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider,
        public httpService: HttpServiceProvider, public tools: ToolsProvider, ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyUploadsPage');
    }

    ionViewWillEnter() {
        this.getMyUploads();
    }
    getMyUploads() {

        const api = '/media/user/' + this.tools.getUserInfo().user['user_id'];
        this.httpService.doGetWithToken(api).subscribe((data) => {
            console.log(data);
            this.list = [];
            for (let item of data) {
                let api = '/media/' + item.file_id;
                this.httpService.doGet(api).subscribe((data) => {
                    this.list.unshift(data);
                }, (err) => {
                    console.log(err);
                });
            }
        }, (err) => {
            console.log(err);
        });

        // const api = '/favourites';
        // this.httpService.doGetWithToken(api).subscribe((data) => {
        //     console.log(data);
        //     this.list = [];
        //     for (let item of data) {
        //         let api = '/media/' + item.file_id;
        //         this.httpService.doGet(api).subscribe((data) => {
        //             this.list.unshift(data);
        //         }, (err) => {
        //             console.log(err);
        //         });
        //     }
        // }, (err) => {
        //     console.log(err);
        // });
    }

}
