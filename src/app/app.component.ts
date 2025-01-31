import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'green-bus';
  isLoading = true;

  ngOnInit(): void {
    // Simulate a delay to show loader (like loading data or waiting for external APIs)
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Adjust time as per your app's load time
  }
}
