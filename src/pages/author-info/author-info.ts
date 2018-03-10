import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ToolsProvider } from '../../providers/tools/tools';
import { MyFavouritesPage } from '../my-favourites/my-favourites';
import { LoginPage } from '../login/login';

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
    public userinfo;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider,
        public httpService: HttpServiceProvider, public tools: ToolsProvider) {

        this.userId = this.navParams.get('userId');

        this.getStatisticsData(this.userId);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthorInfoPage');
        this.userinfo = this.storage.getItem('userinfo');
        if (this.userinfo) {
            this.getAuthorInfo(this.userId);
        }
    }

    getAuthorInfo(userId) {
        if (this.userinfo) {
            const api = '/users/' + userId;
            this.httpService.doGetWithToken(api).subscribe((data) => {
                console.log(data);
                this.authorInfo = data;
            }, (err) => {
                console.log(err);
            });
        } else {
            this.navCtrl.push(LoginPage, { 'comeFrom': 'mediaInfo' });
            return;
        }
    }

    getStatisticsData(userId) {
        if (this.userinfo) {
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
                        console.log(err);

                    });
                }
            }, (err) => {
                console.log(err);
            });
        } else {
            this.navCtrl.push(LoginPage, { 'comeFrom': 'mediaInfo' });
            return;
        }

    }
}
