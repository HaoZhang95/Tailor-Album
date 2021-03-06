import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { CategoryPage } from '../category/category';
import { UserPage } from '../user/user';
import { CartPage } from '../cart/cart';
import { Tabs } from 'ionic-angular/components/tabs/tabs';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = CategoryPage;
    tab3Root = CartPage;
    tab4Root = UserPage;

}
