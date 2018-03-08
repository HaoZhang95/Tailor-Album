import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {

    public cartData = [];
    public price = 0;
    public checkedAll = false;
    public edit = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CartPage');
    }

    ionViewWillEnter() {
        this.storage.setItem('cartData', [
            { "product_title": "Title01", "product_pic": "assets/imgs/d1.png", "product_price": 6 ,"checked":false, "product_count":1},
            { "product_title": "Title02", "product_pic": "assets/imgs/d2.png", "product_price": 7 ,"checked":false, "product_count":2},
            { "product_title": "Title03", "product_pic": "assets/imgs/d3.png", "product_price": 8 ,"checked":false, "product_count":3}
        ]);
        this.getCartData();
    }

    ionViewWillLeave() {
        this.storage.setItem('cartData', this.cartData);
    }

    getCartData() {
        let cartData = this.storage.getItem('cartData');
        console.log(cartData);
        if (cartData) {
            this.cartData = cartData;
        } else {
            this.cartData = [];
        }
        this.changeCart();
    }

    changeCart() {
        console.log(this.cartData);
        let count = 0;
        for (let index = 0; index < this.cartData.length; index++) {
            if (this.cartData[index].checked) {
                ++count;
            }
        }
        if (count == this.cartData.length) {
            this.checkedAll = true;
        } else {
            this.checkedAll = false;
        }
        this.sumTotal();
    }

    sumTotal() {
        let price = 0;
        for (let index = 0; index < this.cartData.length; index++) {
            if (this.cartData[index].checked) {
                price += this.cartData[index].product_count * this.cartData[index].product_price;
            }
        }
        this.price = price;
    }

    decCount(item) {
        if (item.product_count > 1) {
            --item.product_count;
        }
        this.sumTotal();
    }

    incCount(item) {
        ++item.product_count;
        this.sumTotal();
    }

    goPay() {
        let orderData = [];
        for (let index = 0; index < this.cartData.length; index++) {
            if (this.cartData[index].checked) {
                orderData.push(this.cartData[index]);
            }
        }
        // 打印出去结算时的商品
        console.log(orderData);
        this.storage.setItem('orderData',orderData);
        if (orderData.length > 0) {
            //this.navCtrl.push(OrderPage);
            console.log("go to order page ");

        } else {
            alert('你还没有选中物品.');
        }
    }

    changeAll() {
        let cartData = this.storage.getItem('cartData');
        console.log(cartData);
        console.log('checkedAll:' + this.checkedAll);

        if (cartData) {
            if (this.checkedAll) {
                for (let index = 0; index < cartData.length; index++) {
                    cartData[index].checked = true;
                }
            } else {
                for (let index = 0; index < cartData.length; index++) {
                    cartData[index].checked = false;
                }
            }
            this.cartData = cartData;
        } else {
            this.cartData = [];
        }
        this.changeCart();
    }

    // 反向思维,如果没被选中那么就重写写入,这样避免了删除时候index在原数组的麻烦
    editToDelete() {
        let temp = [];
        for (let index = 0; index < this.cartData.length; index++) {
            if (!this.cartData[index].checked) {
                temp.push(this.cartData[index]);
            }
        }
        this.cartData = temp;   //不写这句的话,前台界面还是没被删除的cartdata数据
        this.storage.setItem('cartData', temp);
    }

}
