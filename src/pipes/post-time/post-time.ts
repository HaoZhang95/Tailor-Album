import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PostTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'postTimePipe',
})
export class PostTimePipe implements PipeTransform {
    transform(postTime: number,args ?) {
        let value = Date.now() - postTime;
        value = Math.floor(value /= 1000);

        if (value < 1) // time < 1 sec
            return "just now"
        else if (value >= 1 && value < 60){
            return args == "mediaInfo" ? value + " s" : value + " s ago"
        }

        value = Math.floor(value /= 60);
        if (value >= 1 && value < 60){
            return args == "mediaInfo" ? value + " m" : value + " m ago"
        }
        value = Math.floor(value /= 60);
        if (value >= 1 && value < 24){
            return args == "mediaInfo" ? value + " h" : value + " h ago"
        }
        value = Math.floor(value /= 24);
        if (value >= 1 && value < 7) {
            return args == "mediaInfo" ? value + " d" : value + " d ago"
        }
        value = Math.floor(value /= 7)
        if (value == 1) {
            return args == "mediaInfo" ? value + " w" : value + " w ago"
        }
        else {
            return "false"
        }
    }
}
