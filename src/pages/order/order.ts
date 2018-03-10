import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddressPage } from '../address/address';
import { PaymentPage } from '../payment/payment';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { ToolsProvider } from './../../providers/tools/tools';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-order',
    templateUrl: 'order.html',
})
export class OrderPage {
    public orderData = [];
    public userinfo = '';
    public LoginPage = LoginPage;
    public AddressPage = AddressPage;
    public PaymentPage = PaymentPage;
    public defaultAddress = {};
    public allPrice = 0;
    public leaveWord = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public storage: StorageProvider, public config: ConfigProvider, public tools: ToolsProvider) {
    }

    ionViewWillEnter() {
        this.orderData = this.storage.getItem('orderData');
        this.userinfo = this.tools.getUserInfo();
        this.getDefaultAddress();

        if (this.orderData) {
            this.sumTotal();
        }
        console.log(this.orderData);
    }

    /**
     * Fake Address Data
     */
    getDefaultAddress() {
        this.defaultAddress = {
            address: "Vanha maantie 6",
            name: "Current User",
            phone: "469553366"
        }
    }

    // 结算中心
    goPay() {
        this.navCtrl.push(PaymentPage);
    }

    // 计算总价
    sumTotal() {
        let price = 0;
        for (let index = 0; index < this.orderData.length; index++) {
            if (this.orderData[index].checked) {
                price += this.orderData[index].product_count * this.orderData[index].product_price;
            }
        }
        this.allPrice = price;
    }


}

