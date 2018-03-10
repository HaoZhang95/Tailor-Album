import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    // public ProductInfoPage = ProductInfoPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, ) {

        this.prepareFakeCategoryData();
        this.getHomeSlides();
        this.getRecList();
        this.getHotList();
    }

    getHomeSlides() {
        this.slidesList = [
            { "url": "assets/imgs/frame07.jpg", "price": 9, "old_price": 18, "title": "frame07" },
            { "url": "assets/imgs/frame08.jpg", "price": 18, "old_price": 29, "title": "frame08" },
            { "url": "assets/imgs/frame06.jpg", "price": 24, "old_price": 31, "title": "frame06" },
        ];
    }

    getRecList() {
        this.recList = this.fakeList01;
        this.recListWidth = this.recList.length * 90 + 'px';
    }

    getHotList() {
        this.hotList = this.fakeList01;
    }

    prepareFakeCategoryData() {
        this.fakeList01 = [
            { "url": "assets/imgs/frame01.jpg", "price": 12, "old_price": 18, "title": "frame01" },
            { "url": "assets/imgs/frame02.jpg", "price": 22, "old_price": 29, "title": "frame02" },
            { "url": "assets/imgs/frame03.jpg", "price": 43, "old_price": 49, "title": "frame03" },
            { "url": "assets/imgs/frame04.jpg", "price": 21, "old_price": 29, "title": "frame04" },
            { "url": "assets/imgs/frame05.jpg", "price": 6, "old_price": 12, "title": "frame05" },
            { "url": "assets/imgs/frame06.jpg", "price": 24, "old_price": 31, "title": "frame06" },
        ]
    }

}
