import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterService } from 'src/app/service/master.service';


interface Route {
  from: string;
  to: string;
  price: number;
  busCount: number;
}

// export interface Location {
//   locationId: number;
//   city: string;
//   title: string;
// }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent implements OnInit{
  location$: Observable<any[]> = new Observable<any[]>;

  searchObj: any={
    from:'',
    to:'',
    travelDate:''
  }

  minDate = new Date().toISOString().split('T')[0];
  
  popularRoutes: Route[] = [
    { from: 'Mumbai', to: 'Delhi', price: 399, busCount: 50 },
    { from: 'Chennai', to: 'Bangalore', price: 599, busCount: 45 },
    { from: 'Pune', to: 'Nagpur', price: 499, busCount: 35 }
  ];

  filteredFromCities: string[] = [];
  filteredToCities: string[] = [];
  filteredBuses: any[] = [];

  // cities = [
  //   'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune',
  //   'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur'
  // ];

  
  constructor(private masterService: MasterService){};
  // Fetch posts when the component initializes

  getAllLocations(){
    this.location$ = this.masterService.getLocations();
  }

  ngOnInit(): void {
    this.getAllLocations(); // Fetch posts on initialization

    this.location$.subscribe((locations) => {
      this.filteredFromCities = locations.map(location => location);  // Assuming location has a 'name' property
      this.filteredToCities = locations.map(location => location);
      // console.log('filtered cities:', this.filteredFromCities, this.filteredToCities);  // Log the filtered cities
    });

    
  }


  swapCities() {
    [this.searchObj.from, this.searchObj.to] = [this.searchObj.to, this.searchObj.from];
    // console.log(this.fromCity, this.toCity);

  }

  searchBuses() {
    const fromCity = this.searchObj.from;
    const toCity = this.searchObj.to;
    const travelDate = this.searchObj.travelDate;

    // console.log(fromCity, toCity, travelDate);
    // const {fromCity,toCity,travelDate} = this.searchObj;
    this.masterService.searchBus(fromCity,toCity,travelDate).subscribe((res:any)=>{
      this.filteredBuses = res;
      // console.log('Filtered buses:', this.filteredBuses);  // Log the filtered buses
    });
  
  }

  scrollDown() {
    if (window.innerWidth <= 768) { // Adjust 768px as needed for mobile
      window.scrollBy({
        top: 600, // Adjust scroll amount
        behavior: 'smooth'
      });
    }
  }

  resetSearch(){
    this.searchObj = {
      from:'',
      to:'',
      travelDate:''
    }
    this.filteredBuses = [];
  }

  setToday() {
    this.searchObj.travelDate = new Date().toISOString().split('T')[0]; // Set today's date
  }

  selectRoute(route: Route) {
    this.searchObj.from = route.from;
    this.searchObj.to = route.to;
    this.searchObj.travelDate = this.minDate;
    this.searchBuses();
  }
}
