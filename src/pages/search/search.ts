import { MediaInfoPage } from './../media-info/media-info';
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {

    public flag = false;
    public totalSearchList = [];
    public searchList = [];
    public keyword = "";
    public perPage = 8;
    public hasData = false;
    public userinfo;

    public historyList;

    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public httpService: HttpServiceProvider, public config: ConfigProvider,
        public storage: StorageProvider, private alertCtrl: AlertController, public tools: ToolsProvider) {

    }

    ionViewDidLoad() {
        this.getHistoryList();
    }

    ionViewWillEnter() {
        this.userinfo = this.storage.getItem('userinfo');
    }

    toMediaInfoPage(file_id, user_id) {
        console.log(file_id);
        console.log(user_id);
        this.navCtrl.push(MediaInfoPage, {
            "fileId": file_id,
            "userId": user_id,
            "comeFrom": "searchPage"
        })

    }
    showMostViewed() {
        this.tools.showToast("Sorry, not implemented yet");
    }
    showHottest() {
        this.tools.showToast("Sorry, not implemented yet");
    }
    showTopRated() {
        this.tools.showToast("Sorry, not implemented yet");
    }

    getSearchList(infiniteScroll) {
        if (this.userinfo) {
            if (!infiniteScroll) {
                this.hasData = true;
                // 每次点击搜索的时候,马上返回到页面的顶部,防止回到顶部的时候触发请求, 需要引入和注入content,
                this.content.scrollToTop(0);
                this.saveToHistory();
            }
            const api = '/media/search';
            const json = {
                "title": this.keyword,
                "description": this.keyword
            }
            this.httpService.doPostWithToken(api, json).subscribe((data) => {
                this.totalSearchList = data;
                this.searchList = this.totalSearchList.splice(0, this.perPage);
                this.flag = true;
            }, (err) => {
                console.log(err);
            });

        } else {
            this.navCtrl.push(LoginPage, { 'comeFrom': 'searchPage' });
            return;
        }

    }

    doInfinite(infiniteScroll) {
        if (infiniteScroll) {
            setTimeout(() => {
                if (this.totalSearchList.length < this.perPage) {
                    this.hasData = false;
                } else {
                    this.searchList = this.searchList.concat(this.totalSearchList.splice(0, this.perPage));
                    console.log(this.searchList);
                }
                infiniteScroll.complete();
            }, 1000);
        }
    }

    saveToHistory() {
        let history = this.storage.getItem('historyList');
        if (history) {
            if (!(this.keyword.trim() == '')) {
                if (history.indexOf(this.keyword) == -1) {

                    history.unshift(this.keyword);
                    this.storage.setItem('historyList', history);
                }
            }
        } else {
            this.historyList = [];
            console.log(this.historyList);
            if (!(this.keyword.trim() == '')) {
                this.historyList.push(this.keyword);
                this.storage.setItem('historyList', this.historyList);
            }
        }
    }

    getHistoryList() {
        let history = this.storage.getItem('historyList');
        if (history) {
            this.historyList = history;
        }
        this.historyList = history;
    }

    goSearch(keyword) {
        this.keyword = keyword;
        this.getSearchList(null);
    }

    removeHistory(keyword) {

        let alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        let index = this.historyList.indexOf(keyword);
                        this.historyList.splice(index, 1);
                        this.storage.setItem('historyList', this.historyList);
                    }
                }
            ]
        });
        alert.present();
    }

}
