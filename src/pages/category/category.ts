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
    public recListWidth = '';
    // public ProductInfoPage = ProductInfoPage;

    constructor(public navCtrl: NavController,  public navParams: NavParams,) {

        this.getHomeSlides();
        this.getRecList();
        this.getHotList();
        // for (let index = 0; index < 10; index++) {
        //     this.recList.push({
        //         pic: 'assets/imgs/0' + index + '.jpg',
        //         title: '第'+index+'张'
        //     });
        // }
        // this.recListWidth = this.recList.length * 90 + 'px';
    }

    getHomeSlides() {
            this.slidesList = ["assets/imgs/d1.png","assets/imgs/d2.png","assets/imgs/d3.png","assets/imgs/d1.png","assets/imgs/d2.png","assets/imgs/d3.png"];
    }

    /**
     * 精品推荐：http://39.108.159.135/api/plist?is_best=1
     */
    getRecList() {
            this.recList = ["assets/imgs/d1.png","assets/imgs/d2.png","assets/imgs/d3.png","assets/imgs/d1.png","assets/imgs/d2.png","assets/imgs/d3.png"];;
            this.recListWidth = this.recList.length * 90 + 'px';
    }

    // 猜你喜欢：http://39.108.159.135/api/plist?is_hot=1
    getHotList() {
            this.hotList = ["assets/imgs/d1.png","assets/imgs/d2.png","assets/imgs/d3.png","assets/imgs/d1.png","assets/imgs/d2.png","assets/imgs/d3.png"];;
    }

}
