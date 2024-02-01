import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'timeConvert',
  standalone: true
})
export class TimeConvertPipe implements PipeTransform {


  transform(value: string): string {
    value = `${value}:00`


    const [hours, minutes, seconds] = value.split(':').map(Number);

    // Create a Date object to facilitate formatting
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, seconds);

    // Format the time in 12-hour format with AM/PM
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });



    return formattedTime;

  }

}
