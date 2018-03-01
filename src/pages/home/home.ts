import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { MediaInfoPage } from '../media-info/media-info';
import { SearchPage } from '../search/search';
import { DatePipe } from '@angular/common';
import { AuthorInfoPage } from '../author-info/author-info';
import { StorageProvider } from '../../providers/storage/storage';
import { UploadMediaPage } from '../upload-media/upload-media';
import { ThumbnailPipe } from '../../pipes/thumbnail/thumbnail';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public list = [];
    public likesData = [];
    public commentData = [];
    public MediaInfoPage = MediaInfoPage;
    public AuthorInfoPage = AuthorInfoPage;
    public UploadMediaPage = UploadMediaPage;
    public userinfo;

    constructor(public navCtrl: NavController, public config: ConfigProvider,
        public httpService: HttpServiceProvider, public storage: StorageProvider,public thumbnailPipe: ThumbnailPipe) {
        this.userinfo = this.storage.getItem('userinfo');
    }

    ionViewWillEnter() {
        this.getMediaData();
    }

    goSearchPage() {
        this.navCtrl.push(SearchPage);
    }

    getMediaData() {
        let api = '/media';
        this.httpService.doGet(api).subscribe((data) => {
            this.list = data;
            console.log(this.list);

            if (this.userinfo) {
                for (let index = 0; index < data.length; index++) {
                    let fileId = data[index].file_id;
                    const api01 = '/favourites/file/' + fileId;
                    this.likesData = [];
                    this.httpService.doGet(api01).subscribe((data) => {
                        this.list[index].likesNum = data.length;
                    }, (err) => {
                        console.log(err);
                    });

                    const api02 = '/comments/file/' + fileId;
                    this.commentData = [];
                    this.httpService.doGet(api02).subscribe((data) => {
                        this.list[index].commentsNum = data.length;
                    }, (err) => {
                        alert(err);
                    });

                    const api03 = '/users/' + this.list[index].user_id;
                    this.httpService.doGetWithToken(api03).subscribe((data) => {
                        this.list[index].username = data.username;
                    }, (err) => {
                        alert(err);
                    });
                }
            }
        }, (err) => {
            alert(err);
        });
    }
}
