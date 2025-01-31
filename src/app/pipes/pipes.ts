// journey-time.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journeyTime'
})
export class JourneyTimePipe implements PipeTransform {

  transform(departureTime: string, arrivalTime: string): string {
    if (!departureTime || !arrivalTime) {
      return "Invalid time"; // Handle missing inputs
    }
  
    // Parse the hours and minutes from the hh:mm string format
    const [departureHours, departureMinutes] = departureTime.split(':').map(Number);
    const [arrivalHours, arrivalMinutes] = arrivalTime.split(':').map(Number);

      // Convert the times to total minutes from midnight
      const departureTotalMinutes = departureHours * 60 + departureMinutes;
      const arrivalTotalMinutes = arrivalHours * 60 + arrivalMinutes;

      // Calculate the journey duration in minutes
      let journeyDurationMinutes = arrivalTotalMinutes - departureTotalMinutes;

      // If the arrival time is before the departure time, it means the arrival is on the next day
      if (journeyDurationMinutes < 0) {
        journeyDurationMinutes += 24 * 60; // Add 24 hours worth of minutes (1440 minutes)
      }

      // Convert the journey duration back to hours and minutes
      const hours = Math.floor(journeyDurationMinutes / 60);
      const minutes = journeyDurationMinutes % 60;

      return `${hours}h ${minutes}m`;
  }
}
