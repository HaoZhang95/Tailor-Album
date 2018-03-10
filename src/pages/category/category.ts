import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductInfoPage } from '../product-info/product-info';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-category',
    templateUrl: 'category.html',
})
export class CategoryPage {

    public recList = [];
    public slidesList = [];
    public hotList = [];
    public fakeList01 = [];
    public recListWidth = '';
    public ProductInfoPage = ProductInfoPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider) {
    }

    ionViewWillEnter() {
        console.log(111);

        this.prepareFakeCategoryData();
        this.getHomeSlides();
        this.getRecList();
        this.getHotList();
        if (this.storage.getItem("categoryData")) {
            this.storage.removeItem("categoryData");
        }
        this.storage.setItem("categoryData", this.fakeList01);
    }

    getHomeSlides() {
        this.slidesList.push(this.fakeList01[6])
        this.slidesList.push(this.fakeList01[7])
    }

    getRecList() {
        for (let index = 0; index < 6; index++) {
            this.recList.push(this.fakeList01[index])
        }
        this.recListWidth = this.recList.length * 90 + 'px';
    }

    getHotList() {
        for (let index = 0; index < 6; index++) {
            this.hotList.push(this.fakeList01[index])
        }
    }

    prepareFakeCategoryData() {
        this.fakeList01 = [
            { "fid": 1, "url": "assets/imgs/frame01.jpg", "price": 12, "old_price": 18, "title": "Frame01", "attr": [{ "cate": "Size", "list": [' 4 "', ' 5.7 "'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
            { "fid": 2, "url": "assets/imgs/frame02.jpg", "price": 22, "old_price": 29, "title": "Frame02", "attr": [{ "cate": "Size", "list": [' 5.7 "', ' 7 "', ' 12 "'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
            { "fid": 3, "url": "assets/imgs/frame03.jpg", "price": 43, "old_price": 49, "title": "Frame03", "attr": [{ "cate": "Size", "list": [' 8 "', ' 10 X 7 "'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
            { "fid": 4, "url": "assets/imgs/frame04.jpg", "price": 21, "old_price": 29, "title": "Frame04", "attr": [{ "cate": "Size", "list": [' 6 "', ' 8 "', ' 8 X 10 "'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
            { "fid": 5, "url": "assets/imgs/frame05.jpg", "price": 6, "old_price": 12, "title": "Frame05", "attr": [{ "cate": "Size", "list": [' 4 "', ' 5.7 "', ' 12 "'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
            { "fid": 6, "url": "assets/imgs/frame06.jpg", "price": 24, "old_price": 31, "title": "Frame06", "attr": [{ "cate": "Size", "list": [' 6 "', ' 9.7 "', ' 12 X 18"'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
            { "fid": 7, "url": "assets/imgs/frame07.jpg", "price": 9, "old_price": 18, "title": "Frame07", "attr": [{ "cate": "Size", "list": [' 6 "', ' 8 X 10 "'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
            { "fid": 8, "url": "assets/imgs/frame08.jpg", "price": 18, "old_price": 29, "title": "Frame08", "attr": [{ "cate": "Size", "list": [' 12 "', ' 15.7 "', ' 21 "'] }, { "cate": "Color", "list": ["Red", "Green", "Orange"] }], },
        ]
    }

}
