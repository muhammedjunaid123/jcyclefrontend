import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToTime',
  standalone: true
})
export class DateToTimePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);

    // Set the time zone to Indian Standard Time (IST)
    const options: Intl.DateTimeFormatOptions = {
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };

    const formattedTime = date.toLocaleTimeString('en-US', options);

    return formattedTime;
  }
}
