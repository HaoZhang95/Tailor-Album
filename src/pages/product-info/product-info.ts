import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the ProductInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-product-info',
    templateUrl: 'product-info.html',
})
export class ProductInfoPage {

    @ViewChild('myattr') myattr: ElementRef;
    public list = [];
    public topTabs = 'intro';
    public num = 1;
    public cartNum = 0;
    public CartPage = CartPage;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public config: ConfigProvider, public httpService: HttpServiceProvider, public storage: StorageProvider) {

        let id = this.navParams.get('fid');
        console.log(id);

        this.requestData(id);
        this.cartNum = this.getCartNum();
    }

    /**
     * 对dom节点的操作必须放在这个方法中,不能放在构造器中调用!
     */
    ionViewDidLoad() {
        this.bindEvent();
    }

    requestData(fid) {
        let data = this.storage.getItem("categoryData");
        for (let index = 0; index < data.length; index++) {
            if (data[index].fid == fid) {
                this.list = data[index]
            }
        }
    }

    /**
     * 通过dom节点的操作,来选择商品的属性,必须引入ViewChild,ElementRef和注入两个包才可以在ts中进行原生js的节点操作
     */

    bindEvent() {
        let attrDom = this.myattr.nativeElement;
        attrDom.onclick = (e) => {
            if (e.srcElement.nodeName == 'SPAN') {
                let ele = e.target;
                let parentNode = ele.parentNode;
                let childrens = parentNode.children;    // 不包含空白节点
                for (let index = 0; index < childrens.length; index++) {
                    childrens[index].className = '';
                }
                ele.className = 'active';
            }
        }

    }

    /**
     * 加入购物车之前获取选中的商品属性
     */
    addToCart() {
        let product_title = this.list['title'];
        let product_id = this.list['fid'];
        let product_pic = this.list['url'];
        let product_price = this.list['price'];
        let product_count = this.num;

        let product_attr = '';
        let activeDom = document.querySelectorAll('#myattr .active');
        for (let index = 0; index < activeDom.length; index++) {
            product_attr += activeDom[index].innerHTML;
        }

        let json = {
            product_title,
            product_id,
            product_pic,
            product_price,
            product_count,
            product_attr,
            checked: false  // 加入购物车默认没有选中
        }

        // 加入购物车到localstorage,存在的话需要+1, icon badage也需要加1
        console.log(json);
        let cartData = this.storage.getItem('cartData');
        if (cartData) { // 购物车有没有数据
            // 根据商品的id判断购物车有没有这个商品,有的话需要+1
            if (this.alreadyAdded(cartData, product_id)) {
                for (let index = 0; index < cartData.length; index++) {
                    if (cartData[index].product_id == product_id) {
                        cartData[index].product_count += json.product_count;    // 并不是直接+1,而是选择的数量
                    }
                }
            } else {
                cartData.push(json);
            }

            this.storage.setItem('cartData', cartData);
        } else {    // 第一次加入购物车
            let temp = [];
            temp.push(json);
            this.storage.setItem('cartData', temp);
        }
        // 不论购物车有没有数据,都组要更新数量
        this.cartNum += json.product_count;

    }

    alreadyAdded(cartData, product_id) {
        if (cartData) {
            for (let index = 0; index < cartData.length; index++) {
                if (cartData[index].product_id == product_id) {
                    return true;
                }
            }
        }
        return false;
    }

    decNum() {
        if (this.num > 1) {
            --this.num; // 就等于 this.num -= 1;
        }
    }

    incNum() {
        ++this.num;
    }

    getCartNum() {
        let cartData = this.storage.getItem('cartData');
        let num = 0;
        if (cartData) {
            for (let index = 0; index < cartData.length; index++) {
                num += cartData[index].product_count;
            }
            return num;
        }
        return num;
    }

}

