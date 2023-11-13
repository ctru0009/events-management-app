import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(durationInMinutes: number): string {
    let durationString = "";

    // calculate the number of hours 
    let hour = Math.floor(durationInMinutes / 60);

    // calculate the remaining minutes 
    let minute = durationInMinutes % 60;
    
    // updating the hours and minutes
    durationString = ((hour > 0) ? `${hour} hour(s)` : "") + ((minute > 0 && hour > 0) ? " and " : "") + ((minute > 0) ? ` ${minute} minute(s)` :"");
    return durationString;
  }

}
