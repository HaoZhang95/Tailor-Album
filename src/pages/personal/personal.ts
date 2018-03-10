import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-personal',
    templateUrl: 'personal.html',
})
export class PersonalPage {

    public userinfo = this.storage.getItem('userinfo');

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider) {
    }

    loginOut() {
        if (this.storage.getItem('userinfo')) {
            this.storage.removeItem('userinfo');
        }
        this.storage.removeAll();
        this.navCtrl.popToRoot();
    }

}
