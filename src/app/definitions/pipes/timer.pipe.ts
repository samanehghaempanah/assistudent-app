import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    // const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    const seconds: number = value % 60;
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + seconds).slice(-2)
    );
  }
}


// ('00' + hours).slice(-2) +
// ':' +