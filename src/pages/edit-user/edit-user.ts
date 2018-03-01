import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { AlertController } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { LoginPage } from '../login/login';
/**
 * Generated class for the EditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-user',
    templateUrl: 'edit-user.html',
})
export class EditUserPage {
    public username;
    public password;
    public email;
    public userinfo;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider,
        public httpService: HttpServiceProvider, private alertCtrl: AlertController, private tools: ToolsProvider) {
    }

    ionViewDidLoad() {
        this.userinfo = this.storage.getItem('userinfo');
        if (this.userinfo) {
            this.username = this.userinfo.user.username;
            this.email = this.userinfo.user.email;
        }
    }

    doUpdate() {
        let newInfo = {
            username: this.username,
            email: this.email
        }

        let api = '/users';
        this.httpService.doPutWithToken(api, newInfo).subscribe((data) => {
            let userinfo = this.storage.getItem('userinfo');
            userinfo.user.username = this.username;
            userinfo.user.email = this.email;
            this.storage.setItem('userinfo', userinfo);

            this.tools.showToast('Update personal info successfully.');
            this.navCtrl.popToRoot();
        }, (err) => {
            console.log(err);
        });
    }

    validateEmail() {
        let alert = this.alertCtrl.create({
            title: 'Reset Password',
            message: 'You have to validate email before you reset it. Please type your email which was used to register this account',
            inputs: [{
                name: 'email',
                placeholder: 'email',
                type: 'text'
            }],
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Confirm',
                handler: input => {

                    const api = '/users/user';
                    this.httpService.doGetWithToken(api).subscribe((data) => {
                        if (input.email == data.email) {
                            this.doUpdatePW();
                        } else {
                            this.tools.showToast('Validate failed, because of wrong email.');
                        }
                    }, (err) => {
                        console.log(err);
                    });
                }
            }
            ]
        });
        alert.present();
    }

    doUpdatePW() {
        let alert = this.alertCtrl.create({
            title: 'Reset Password',
            message: 'Now please type your new password',
            inputs: [
                {
                    name: 'password',
                    placeholder: 'password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: input => {
                        let api = '/users';
                        let newInfo = {
                            password: input.password
                        }
                        this.httpService.doPutWithToken(api, newInfo).subscribe((data) => {
                            this.tools.showToast('Reset password successfully.');
                            this.navCtrl.popToRoot();
                        }, (err) => {
                            this.tools.showToast('Reset password failed, please try again.');
                        });
                    }
                }
            ]
        });
        alert.present();
    }
}
