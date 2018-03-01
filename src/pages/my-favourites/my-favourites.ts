import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { ToolsProvider } from '../../providers/tools/tools';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { MediaInfoPage } from '../media-info/media-info';
/**
 * Generated class for the MyFavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-favourites',
    templateUrl: 'my-favourites.html',
})
export class MyFavouritesPage {

    public list = [];
    public uploads = [];
    public MediaInfoPage = MediaInfoPage;
    public username;

    constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider,
        public httpService: HttpServiceProvider, public tools: ToolsProvider, ) {

        this.uploads = this.navParams.get('uploads');
        this.username = this.navParams.get('username');
        if (this.uploads) {
            this.list = this.uploads;
        }
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter() {
        if (!this.uploads) {
            this.getMyFavoutites();
        }
    }
    getMyFavoutites() {
        const api = '/favourites';
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
    }
}
