import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { StorageProvider } from '../../providers/storage/storage';
import { PersonalPage } from '../personal/personal';
import { EditUserPage } from '../edit-user/edit-user';
import { MyFavouritesPage } from '../my-favourites/my-favourites';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage {

    public LoginPage = LoginPage;
    public RegisterPage = RegisterPage;
    public PersonalPage = PersonalPage;
    public EditUserPage = EditUserPage;
    public MyFavouritesPage = MyFavouritesPage;
    public userinfo = null;

    public likesNum = 0;
    public uploadsNum = 0;
    public ratingNum = 0;
    public ratingList = [];


    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public httpService: HttpServiceProvider) {
    }

    ionViewDidLoad() {

    }


    ionViewWillEnter() {
        this.userinfo = this.storage.getItem('userinfo');
        this.userinfo = ((this.userinfo && this.userinfo.user.username) ? this.userinfo : null);
    }

    goEditUserPage() {
        this.navCtrl.push((this.userinfo == null ? LoginPage : EditUserPage));
    }

    getStatisticsData() {

        if (this.userinfo) {
            const api01 = '/favourites';
            this.httpService.doGetWithToken(api01).subscribe((data) => {
                console.log(data);
                this.likesNum = data.length;
            }, (err) => {
                console.log(err);
            });

            const api02 = '/media/user/' + this.userinfo.user['user_id'];
            this.httpService.doGetWithToken(api02).subscribe((data) => {
                console.log(data);
                this.uploadsNum = data.length;
            }, (err) => {
                console.log(err);
            });

            const api03 = '/ratings';
            this.httpService.doGetWithToken(api03).subscribe((data) => {
                console.log(data);
                this.ratingList = [];
                for (let index = 0; index < data.length; index++) {
                    if (data[index].user_id == this.userinfo.user.user_id) {
                        this.ratingList.unshift(data[index]);
                    }
                }
                this.ratingNum = this.ratingList.length;
                console.log(this.ratingList);
            }, (err) => {
                console.log(err);
            });
        }
    }
}
