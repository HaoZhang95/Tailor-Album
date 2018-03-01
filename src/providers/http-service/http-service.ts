import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigProvider } from './../config/config';
import { StorageProvider } from '../../providers/storage/storage';
import { Observable } from "rxjs";
import "rxjs/Rx";

@Injectable()
export class HttpServiceProvider {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(public http: Http, public config: ConfigProvider, public storage: StorageProvider) {  }

    /**
     * do http-request according to its category (get/post/delete/put/withToken/withoutToken)
     * I got six methods instead of (login(),register()....) in order to decrease codes
     */

    doGet(api) {
        const URL = this.config.baseUrl + api;
        return this.http.get(URL).map((resp) => resp.json());
    }

    doGetWithToken(api) {
        const apiUrl = this.config.baseUrl + api;
        const headers = new Headers({ 'x-access-token': this.storage.getItem('userinfo').token })
        const options = new RequestOptions({ headers: headers })
        return this.http.get(apiUrl, options).map(
            (res) => res.json()
        );
    }

    doPost(api, json) {
        const apiUrl = this.config.baseUrl + api;
        return this.http.post(apiUrl, JSON.stringify(json), { headers: this.headers }).map((resp) => resp.json());
    }

    /**
     * 第二个参数json, 有的情况下直接json原格式,有的需要JSON.stringify,看情况
     */
    doPostWithToken(api, json) {
        const apiUrl = this.config.baseUrl + api;
        const headers = new Headers({ 'x-access-token': this.storage.getItem('userinfo').token })
        const options = new RequestOptions({ headers: headers })
        return this.http.post(apiUrl, json, options).map((resp) => resp.json());
    }

    // Upload a media file
    doPostUpload = (formData: any) => {
        const token = this.storage.getItem('userinfo').token;
        if (token) {
            const headers = new Headers({ 'x-access-token': token })
            const options = new RequestOptions({ headers: headers })

            return this.http.post(this.config.baseUrl + '/media', formData, options)
                .map(
                resp => resp.json()
                )
        }
    }

    doPutWithToken(api, json) {
        const apiUrl = this.config.baseUrl + api;
        const headers = new Headers({ 'x-access-token': this.storage.getItem('userinfo').token })
        const options = new RequestOptions({ headers: headers })
        return this.http.put(apiUrl, json, options)
            .map((res) => res.json()
            )
    }

    doDeleteWithToken(api) {
        const apiUrl = this.config.baseUrl + api;
        const headers = new Headers({ 'x-access-token': this.storage.getItem('userinfo').token })
        const options = new RequestOptions({ headers: headers })
        return this.http.delete(apiUrl, options)
            .map((res) => res.json()
            )
    }

}
