import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

    public baseUrl = 'http://media.mw.metropolia.fi/wbma';
    public fileUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

    constructor() {

    }

}
