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
    public page = 1;
    public perPage = 5;
    public hasData = false;
    public flag = false;

    public likesData = [];
    public commentData = [];
    public MediaInfoPage = MediaInfoPage;
    public AuthorInfoPage = AuthorInfoPage;
    public UploadMediaPage = UploadMediaPage;
    public userinfo;

    constructor(public navCtrl: NavController, public config: ConfigProvider,
        public httpService: HttpServiceProvider, public storage: StorageProvider, public thumbnailPipe: ThumbnailPipe) {

    }

    ionViewWillEnter() {
        this.userinfo = this.storage.getItem('userinfo');
        console.log(this.page);

        if (this.page == 1) {
            this.getMediaData(null);
        }
    }

    goSearchPage() {
        this.navCtrl.push(SearchPage);
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.getMediaData(infiniteScroll);
            infiniteScroll.complete();
        }, 500);
    }

    getMediaData(infiniteScroll) {

        if (!infiniteScroll) {
            this.page = 1;
            this.hasData = true;
        }

        let api = '/media?start=' + (this.page - 1) * this.perPage + '&limit=' + this.perPage;
        console.log(api);


        this.httpService.doGet(api).subscribe((data) => {

            if (this.page == 1) {
                this.list = data;
            } else {
                this.list = this.list.concat(data);
            }
            this.flag = true;
            if (infiniteScroll) {
                infiniteScroll.complete();
                // 使用波尔值设置html滚动的属性 [ngif]
                if (data.length < this.perPage) {
                    this.hasData = false;
                }
            }
            this.page++;

            //this.list = data;
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
                    console.log(err);

                });

                const api03 = '/users/' + this.list[index].user_id;
                if (this.userinfo) {
                    this.httpService.doGetWithToken(api03).subscribe((data) => {
                        this.list[index].username = data.username;
                    }, (err) => {
                        console.log(err);
                    });
                }
            }
            console.log(this.list);
        });
    }
}

// this.httpService.doGet(api).subscribe((data) => {

//     this.list = data;
//     for (let index = 0; index < data.length; index++) {
//         let fileId = data[index].file_id;
//         const api01 = '/favourites/file/' + fileId;
//         this.likesData = [];
//         this.httpService.doGet(api01).subscribe((data) => {
//             this.list[index].likesNum = data.length;
//         }, (err) => {
//             console.log(err);
//         });

//         const api02 = '/comments/file/' + fileId;
//         this.commentData = [];
//         this.httpService.doGet(api02).subscribe((data) => {
//             this.list[index].commentsNum = data.length;
//         }, (err) => {
//             console.log(err);

//         });

//         const api03 = '/users/' + this.list[index].user_id;
//         if (this.userinfo) {
//             this.httpService.doGetWithToken(api03).subscribe((data) => {
//                 this.list[index].username = data.username;
//             }, (err) => {
//                 console.log(err);
//             });
//         }
//     }
//     console.log(this.list);
// });
