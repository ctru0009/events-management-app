import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  events: any[] = [];

  eventId: string = "";
  eventName: string = "";
  eventCapacity: number = 0;

  constructor(private dbService: DatabaseService, private router: Router) { }  

  ngOnInit(): void {
    this.dbService.listEvents().subscribe((data: any) => {
      this.events = data;  // assign the data retrieved from the API to the events array
    });
  }

  selectEvent(id: string, name: string, capacity: number) { 
    // assign the values to the variables
    this.eventId = id; 
    this.eventName = name;
    this.eventCapacity = capacity;
  }

  updateEvent() {
    this.dbService.updateEvent({
        // pass the values to the updateEvent method
        id: this.eventId, 
        name: this.eventName,
        capacity: this.eventCapacity,  
      }).subscribe({ 
        next: (data: any) => { 
          console.log(data)
          this.ngOnInit() // refresh the page
          this.router.navigate(["/list-events"])  // redirects to list events
        }, 
        error: (error) => {  // if an error occurs
          console.log(error); 
          if (error.status === 400) {
            this.router.navigate(['/invalid-data']);  // redirect Invalid Data page if the server responds with status 400
          }
          return error;
        }
      });
  }

}
