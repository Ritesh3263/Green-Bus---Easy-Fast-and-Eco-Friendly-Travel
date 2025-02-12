import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-booking-confirmed',
  templateUrl: './booking-confirmed.component.html',
  styleUrls: ['./booking-confirmed.component.scss']
})
export class BookingConfirmedComponent implements OnInit {
  appTitle: string = '';
  selectedSeats: any[] = [];
  randomReference: string = ''; // Declare this variable

  ngOnInit(): void {  // Corrected lifecycle hook name
    // Generate the random reference when the component is initialized
    this.randomReference = this.generateRandomReference();
    
    // Trigger change detection manually to ensure everything is settled
    // this.cdr.detectChanges();
  }

  constructor(private titleService: Title) {
    this.appTitle = this.titleService.getTitle();
    this.selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
  }

  get seatLabels(): string {
    // Create a unique set of labels and join them with commas
    const uniqueSeats = Array.from(new Set(this.selectedSeats.map(seat => seat.label)));
    return uniqueSeats.join(', ');
  }

  generateRandomReference(): string {
    const prefix = 'Green-Bus'; // You can modify the prefix as needed
    const randomPart = Math.random().toString(36).substr(2, 8).toUpperCase(); // Generate a random alphanumeric string
    return `${prefix}-${randomPart}`;
  }
  // You can also use a getter for convenience
  // get randomReference(): string {
  //   return this.generateRandomReference();
  // }

}
