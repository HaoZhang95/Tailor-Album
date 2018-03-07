import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';
import { ToolsProvider } from '../../providers/tools/tools';
import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    public email = '';
    public username = '';
    public password = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider,
        public storage: StorageProvider, public tools: ToolsProvider) {
    }

    ionViewDidLoad() {

    }

    goBack () {
        this.navCtrl.pop();
    }

    launchSignIn() {
        this.navCtrl.push(LoginPage);
    }

    doRegister() {
        let api = '/users/username/' + this.username;
        console.log(this.username);
        console.log(this.password);

        this.httpService.doGet(api).subscribe((data) => {
            console.log(data);

            if (data.available) {
                // 表单格式验证---略
                let api = '/users';
                let json = {
                    email: this.email,
                    username: this.username,
                    password: this.password
                }
                this.httpService.doPost(api, json).subscribe((data) => {
                    console.log(data);

                    const api = '/login';
                    this.httpService.doPost(api, {'username':this.username,'password':this.password}).subscribe((data) => {
                        this.storage.setItem('userinfo', data);
                        this.navCtrl.setRoot(UserPage);
                        console.log(data);

                    }, (err) => {
                        console.log(err);

                    })


                }, (err) => {
                    console.log(err);
                })
            } else {
                this.tools.showToast('Username already exists.');
            }
        }, (err) => {
            console.log(err);
        })
    }
}
