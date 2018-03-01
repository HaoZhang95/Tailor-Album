import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

    /**
     * export different size of photo according to input parameter
     */
    transform(value: any, args?: any): any {
        const defaultSize = '-tn320.png';
        const sizes = {
            small: '-tn160.png',
            medium: '-tn320.png',
            large: '-tn640.png',
        };
        return (args ?
            ((args in sizes) ? value.split('.')[0] + sizes[args] : value.split('.')[0] + defaultSize)
            : value.split('.')[0] + defaultSize);
    }
}
