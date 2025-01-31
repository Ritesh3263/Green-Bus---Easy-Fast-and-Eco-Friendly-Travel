// journey-time.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journeyTime'
})
export class JourneyTimePipe implements PipeTransform {

  transform(departureTime: string, arrivalTime: string): string {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);

    const journeyDurationMs = arrivalDate.getTime() - departureDate.getTime();
    
    const hours = Math.floor(journeyDurationMs / (1000 * 60 * 60)); // Get full hours
    const minutes = Math.floor((journeyDurationMs % (1000 * 60 * 60)) / (1000 * 60)); // Get minutes

    return `${hours}h ${minutes}m`;
  }
}
