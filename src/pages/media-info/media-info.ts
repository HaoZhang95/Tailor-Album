import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { ToolsProvider } from '../../providers/tools/tools';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';
import { PostTimePipe } from '../../pipes/post-time/post-time';
import { DatePipe } from '@angular/common';
import { AlertController } from 'ionic-angular';
import { AuthorInfoPage } from '../author-info/author-info';
import { ThumbnailPipe } from '../../pipes/thumbnail/thumbnail';

/**
 * Generated class for the MediaInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-media-info',
    templateUrl: 'media-info.html',
})
export class MediaInfoPage {

    public statistics = '';
    public fileId;
    public mediaItem = [];
    public authorInfo = [];
    public comments = [];
    public commentsWithoutLogin = [];
    public tags = [];
    public likesBy = [];
    public likesByWithoutLogin = [];
    public ratingBy = [];
    public comment;
    public tag;
    public isLiked;
    public showAddIcon = true;
    public showDeleteTag = false;
    public AuthorInfoPage = AuthorInfoPage;
    public username;
    public userId;
    public isOwner;
    public avgRating = 0;
    public comeFrom = '';
    public showFooter = true;
    public userinfo;

    constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider,
        public httpService: HttpServiceProvider, public tools: ToolsProvider, public storage: StorageProvider,
        public postTimePipe: PostTimePipe, public datePipe: DatePipe, public alertCtrl: AlertController, public thumbnailPipe: ThumbnailPipe) {

        this.fileId = this.navParams.get('fileId');
        this.userId = this.navParams.get('userId');
        this.comeFrom = this.navParams.get('comeFrom');
        this.statistics = ((this.comeFrom) ? this.comeFrom : 'comments');
        this.showFooter = ((this.statistics == 'comments') ? true : false);



    }

    ionViewWillEnter() {
        this.userinfo = this.storage.getItem('userinfo');
        console.log(this.userinfo);
        if (this.userinfo) {
            this.getUserInfoByUserId(this.userId);
            this.validateIsLiked();
        }
        this.getLikesData();
        this.getCommentsById();
        this.getTags();
        this.getRatingData();
    }

    ionViewDidLoad() {

        this.getMediaById();
        this.isOwner = ((this.userinfo && this.userId == this.userinfo['user_id']) ? true : false);
    }

    addRating() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Rate this media');
        alert.addInput({
            type: 'radio',
            label: '5',
            value: '5',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: '4',
            value: '4',
        });
        alert.addInput({
            type: 'radio',
            label: '3',
            value: '3',
        });
        alert.addInput({
            type: 'radio',
            label: '2',
            value: '2',
        });
        alert.addInput({
            type: 'radio',
            label: '1',
            value: '1'
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: data => {
                console.log('Checkbox data:', data * 1);
                const api = '/ratings';
                this.httpService.doPostWithToken(api, { 'file_id': this.fileId, 'rating': data * 1 }).subscribe((data) => {
                    console.log(data);
                    this.getRatingData();
                }, (err) => {
                    this.tools.showToast('Add rating failed. No need to rating once more.');
                });
            }
        });
        alert.present();
    }

    getUserInfoByUserId(userId) {
        const api = '/users/' + userId;
        this.httpService.doGetWithToken(api).subscribe((data) => {
            console.log(data);
            this.authorInfo = data;
        }, (err) => {
            console.log(err);
        });
    }

    deleteMedia() {
        const api = '/media/' + this.fileId;
        this.httpService.doDeleteWithToken(api).subscribe((data) => {
            console.log(data);
            this.navCtrl.pop();
        }, (err) => {
            console.log(err);
            this.tools.showToast('No permission to delete this media. Since you are not owner.');
        });
    }

    getRatingData() {
        const api = '/ratings/file/' + this.fileId;
        this.httpService.doGet(api).subscribe((data) => {
            let sumRating = 0;
            for (let index = 0; index < data.length; index++) {
                sumRating += data[index].rating;
            }
            this.avgRating = ((data.length != 0) ? sumRating / data.length : 0);

            this.ratingBy = [];
            if (this.userinfo) {
                for (let item of data) {
                    let api = '/users/' + item.user_id;
                    this.httpService.doGetWithToken(api).subscribe((data) => {
                        data.rating = item.rating;
                        this.ratingBy.unshift(data);
                    }, (err) => {
                        console.log(err);
                    });
                }
            }
        }, (err) => {
            console.log(err);
        });
    }

    getLikesData() {

        const api = '/favourites/file/' + this.fileId;
        this.httpService.doGet(api).subscribe((data) => {
            this.likesBy = [];
            this.likesByWithoutLogin = data
            if (this.userinfo) {
                for (let item of data) {
                    let api = '/users/' + item.user_id;
                    this.httpService.doGetWithToken(api).subscribe((data) => {
                        this.likesBy.push(data);
                    }, (err) => {
                        console.log(err);
                    });
                }
            }
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * no permission to delete a Tag
     */
    deleteTag(item) {
        const api = '/tags/' + item.tag_id;
        this.httpService.doDeleteWithToken(api).subscribe((data) => {
            console.log(data);
        }, (err) => {
            console.log(err);
            this.tools.showToast('No permission to delete a Tag');
            this.showDeleteTag = !this.showDeleteTag;
        });
    }

    addTag() {
        let prompt = this.alertCtrl.create({
            title: 'Add Tag',
            message: 'Please type tag you want to add to this picture.',
            inputs: [
                {
                    name: 'tag',
                    placeholder: 'Tag name'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        if (data.tag.trim() != '') {
                            const api = '/tags';
                            this.httpService.doPostWithToken(api, { 'file_id': this.fileId, 'tag': encodeURIComponent(data.tag) }).subscribe((data) => {
                                this.getTags();
                            }, (err) => {
                                console.log(err);
                            });
                        } else {
                            this.tools.showToast('Tag can not be blank.');
                        }
                    }
                }
            ]
        });
        prompt.present();
    }

    getTags() {
        let api = '/tags/file/' + this.fileId;
        this.httpService.doGet(api).subscribe((data) => {
            this.tags = data;
        }, (err) => {
            alert(err);
        });
    }

    addToFavourite() {
        if (this.userinfo) {
            const api = '/favourites';
            this.httpService.doPostWithToken(api, { 'file_id': this.fileId }).subscribe((data) => {
                console.log(data);
                this.isLiked = true;
                this.getLikesData();
            }, (err) => {
                console.log(err);
                this.isLiked = false;
            });
        } else {
            this.navCtrl.push(LoginPage, { 'comeFrom': 'mediaInfo' });
            return;
        }

    }

    cancelFavourite() {
        const api = '/favourites/file/' + this.fileId;
        this.httpService.doDeleteWithToken(api).subscribe((data) => {
            console.log(data);
            this.isLiked = false;
            this.getLikesData();
        }, (err) => {
            console.log(err);
        });
    }

    validateIsLiked() {
        const api = '/favourites';
        this.httpService.doGetWithToken(api).subscribe((data) => {
            console.log(data);
            let list = data;
            for (let item of list) {
                if (item.file_id == this.fileId) {
                    this.isLiked = true;
                    return;
                }
            }
            this.isLiked = false;
        }, (err) => {
            console.log(err);
        });
    }

    doRefresh(refresher) {
        setTimeout(() => {
            switch (this.statistics) {
                case 'likes':
                    this.getLikesData();
                    break;
                case 'comments':
                    this.getCommentsById();
                    break;
                case 'rating':
                    this.getRatingData();
                    break;
                default:
                    break;
            }
            refresher.complete();
        }, 1000);
    }

    getMediaById() {
        let api = '/media/' + this.fileId;
        this.httpService.doGet(api).subscribe((data) => {
            this.mediaItem = data;
        }, (err) => {
            alert(err);
        });
    }

    getCommentsById() {
        let api = '/comments/file/' + this.fileId;
        this.httpService.doGet(api).subscribe((data) => {
            this.comments = data;

            for (let comment of this.comments) {
                let timeAdded = new Date(comment.time_added);
                comment.time_added = this.postTimePipe.transform(timeAdded.getTime(), "mediaInfo")

                if (this.userinfo) {
                    let api = '/users/' + comment.user_id;
                    this.httpService.doGetWithToken(api).subscribe((data) => {
                        comment.username = data.username;
                    }, (err) => {
                        console.log(err);
                    });
                } else {
                    comment.idNumber = comment.user_id;
                }

            }
            this.comments.reverse();
        }, (err) => {
            alert(err);
        });
    }

    postComments() {
        if (!this.storage.getItem('userinfo')) {
            this.navCtrl.push(LoginPage, { 'comeFrom': 'mediaInfo' });
            return;
        }
        if (this.comment.trim() != '') {
            const api = '/comments';
            const json = {
                "file_id": this.fileId,
                "comment": this.comment
            }
            this.httpService.doPostWithToken(api, json).subscribe((data) => {
                console.log(data);
                this.getCommentsById();
                this.getLikesData()
                this.comment = '';
            }, (err) => {
                console.log(err);
            });
        } else {
            this.tools.showToast('Comment can not be empty.');
        }
    }
}
