import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  scheduleId: number = 0;
  scheduleData: any = { };
  selectedSeats: any[] = [];
  selectedDeck: 'upperDeck' | 'lowerDeck' = 'lowerDeck';
  // seatPrice: number = 0;

  ngOnInit() {
    this.getScheduleDetailById();
  }

  constructor(private activatedRoute: ActivatedRoute, private masterService: MasterService, private router: Router){
    this.activatedRoute.params.subscribe((res:any) => {
      this.scheduleId = res.id;
      this.getScheduleDetailById();
    });
  }

  getScheduleDetailById() {
    this.masterService.getBusByScheduleId(this.scheduleId).subscribe((res:any) => {
      this.scheduleData = res
      // console.log('Schedule details:', this.scheduleData);  // Log the schedule details
    });
    localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
  }

  
  // Check if the seat is selected
  isSeatSelected(seat: any): boolean {
    return this.selectedSeats.some(s => s.label === seat.label);
  }
  
  toggleSeat(seat: any){
    const index = this.selectedSeats.findIndex(s => s.id === seat.id);

    if (index > -1) {
      // If seat is already selected, remove it
      this.selectedSeats.splice(index, 1);
    } else {
      // Add seat if not already selected
      this.selectedSeats.push(seat);
    }
    // console.log(this.selectedSeats);
  }

  /** Calculate total price */
  getTotalPrice(): number {
    return this.selectedSeats.length * this.scheduleData.price;
  }

  /** Remove a seat from selection */
  removeSeat(seat: any) {
    this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
  }
  
  /** Toggle Deck selection */
  switchDeck(deck: 'upperDeck' | 'lowerDeck') {
    this.selectedDeck = deck;
  }



  confirmBooking() {
    localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
    this.router.navigate(['/confirmBooking']);
  }

}
