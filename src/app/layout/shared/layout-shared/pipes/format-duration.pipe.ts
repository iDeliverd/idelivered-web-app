import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(value: number, arg1: any, arg2: any): string {
    let seconds: any;
    let minutes: any;
    let hours:   any;

    if (arg1 === 's' && arg2 === 'hhmmss') {
      seconds = Math.floor((value % 60));
      minutes = Math.floor(((value / 60) % 60));
      hours   = Math.floor(((value / 60) / 60));
      return this.format(seconds, minutes, hours);
    }
  }
    private format(seconds, minutes, hours) {
      (hours < 10) ? hours = '0' + hours : hours;
      (minutes < 10) ? minutes = '0' + minutes : minutes;
      (seconds < 10) ? seconds = '0' + seconds : seconds;
          return `${hours}:${minutes}:${seconds}`;
  }

}