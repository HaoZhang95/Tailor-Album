import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// <-------------------------------------------------------->
import { StorageProvider } from '../providers/storage/storage';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { ToolsProvider } from '../providers/tools/tools';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PersonalPage } from '../pages/personal/personal';
import { CategoryPage } from '../pages/category/category';
import { ConfigProvider } from '../providers/config/config';
import { HttpModule, JsonpModule } from '@angular/http';
import { MediaInfoPage } from '../pages/media-info/media-info';
import { SearchPage } from '../pages/search/search';
import { EditUserPage } from '../pages/edit-user/edit-user';
import { ProductInfoPage } from './../pages/product-info/product-info';
import { PostTimePipe } from '../pipes/post-time/post-time';
import { DatePipe } from '@angular/common';
import { MyFavouritesPage } from '../pages/my-favourites/my-favourites';
import { AuthorInfoPage } from '../pages/author-info/author-info';
import { UploadMediaPage } from '../pages/upload-media/upload-media';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';
import { CartPage } from '../pages/cart/cart';
import { OrderPage } from '../pages/order/order';
import { AddressPage } from '../pages/address/address';
import { PaymentPage } from '../pages/payment/payment';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { MyUploadsPage } from './../pages/my-uploads/my-uploads';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        UserPage,
        LoginPage,
        RegisterPage,
        PersonalPage,
        CategoryPage,
        MediaInfoPage,
        SearchPage,
        EditUserPage,
        MyFavouritesPage,
        AuthorInfoPage,
        UploadMediaPage,
        ThumbnailPipe,
        CartPage,
        ProductInfoPage,
        OrderPage,
        AddressPage,
        PaymentPage,
        MyUploadsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        IonicModule.forRoot(MyApp, {
            tabsHideOnSubPages: 'true',
            backButtonText: ''
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        UserPage,
        LoginPage,
        RegisterPage,
        PersonalPage,
        CategoryPage,
        MediaInfoPage,
        SearchPage,
        EditUserPage,
        MyFavouritesPage,
        AuthorInfoPage,
        UploadMediaPage,
        CartPage,
        ProductInfoPage,
        OrderPage,
        AddressPage,
        PaymentPage,
        MyUploadsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        StorageProvider,
        HttpServiceProvider,
        ToolsProvider,
        ConfigProvider,
        PostTimePipe,
        DatePipe,
        Camera,
        File,
        FileTransfer,
        ThumbnailPipe
    ]
})
export class AppModule { }
