import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ToolsProvider } from '../../providers/tools/tools';
import { MyFavouritesPage } from '../my-favourites/my-favourites';

/**
 * Generated class for the AuthorInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-author-info',
    templateUrl: 'author-info.html',
})
export class AuthorInfoPage {

    public userId;
    public uploadsNum = 0;
    public favouritesNum = 0;
    public authorInfo = [];
    public uploads = [];
    public favourites = [];
    public MyFavouritesPage = MyFavouritesPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider,
        public httpService: HttpServiceProvider, public tools: ToolsProvider) {
        this.userId = this.navParams.get('userId');

        this.getAuthorInfo(this.userId);
        this.getStatisticsData(this.userId);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthorInfoPage');
    }

    getAuthorInfo(userId) {
        const api = '/users/' + userId;
        this.httpService.doGetWithToken(api).subscribe((data) => {
            console.log(data);
            this.authorInfo = data;
        }, (err) => {
            console.log(err);
        });
    }

    getStatisticsData(userId) {
        const api = '/media/user/' + userId;
        this.httpService.doGetWithToken(api).subscribe((data) => {
            console.log(data);
            this.uploadsNum = data.length;
            this.uploads = [];
            for (let index = 0; index < data.length; index++) {
                let api = '/media/' + data[index].file_id;
                this.httpService.doGet(api).subscribe((data) => {
                    console.log(data);
                    this.uploads.push(data);
                }, (err) => {
                    alert(err);
                });
            }
        }, (err) => {
            console.log(err);
        });
    }
}
