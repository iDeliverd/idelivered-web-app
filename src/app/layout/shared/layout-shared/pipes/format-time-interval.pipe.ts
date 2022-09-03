import { PipeTransform, Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'formatTimeInterval'
})
export class FormatTimeIntervalPipe implements PipeTransform {
  constructor(private translate:TranslateService){

  }
  transform(mins: number, withoutFlag): string {    
    let hours: number = Math.floor(mins / 60);
    let remainingMinutes: number = mins % 60;
    let hr = '';
    let min = '';
    if (hours < 10) {
      hr = hours.toString();
      if(!withoutFlag) {
        hr = hr + ' ' + (hours > 1 ?  this.translate.instant('Hours') : this.translate.instant('Hour'));
      }
    } else {
      hr = hours.toString();
      if(!withoutFlag) {
        hr = hr + ' ' + this.translate.instant('Hours');
      }
    }
    if (remainingMinutes < 10) {
      min = remainingMinutes.toString();
      if(!withoutFlag) {
        min = min + ' ' + (remainingMinutes > 1 ? this.translate.instant('Minutes') : this.translate.instant('Minute'));
      }
    } else {
      min = remainingMinutes.toString();
      if(!withoutFlag) {
        min = min + ' ' + this.translate.instant('Minutes');
      }
    }
    if (hours == 0 && remainingMinutes != 0) return min;
    else if (hours != 0 && remainingMinutes == 0) return hr;
    else if (hours != 0 && remainingMinutes != 0) return hr + ' ' + min;
    else if (hours == 0 && remainingMinutes == 0) return '00:00';
  }

}