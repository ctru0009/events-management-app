import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

const DEFAULT_DESC = "No description available";
const DEFAULT_IMG = "Event_Detail.png";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  eventName: string = "";
  eventDescription: string = "";
  eventStartDateTime: Date = new Date();
  eventDurationInMin: number = 60;
  eventIsActive: boolean = true;
  eventImage: string = "";
  eventCapacity: number = 0;
  eventTicketsAvailable: number = this.eventCapacity;  
  eventCategoryId: string = "";

  constructor(private dbService: DatabaseService, private router: Router) { } 

  addEvent() {
    // get the values from the form
    let name = this.eventName
    let description = this.eventDescription ? this.eventDescription : DEFAULT_DESC
    let startDateTime = new Date(this.eventStartDateTime)
    let durationInMin = this.eventDurationInMin
    let isActive = this.eventIsActive ? true : false
    let image = this.eventImage ? this.eventImage : DEFAULT_IMG
    let capacity = this.eventCapacity ? this.eventCapacity : 1000
    let ticketsAvailable = this.eventTicketsAvailable ? this.eventTicketsAvailable : capacity
    let categoryId = this.eventCategoryId

    // create an event object
    let anEvent = {
      name,
      description,
      startDateTime,
      durationInMin,
      isActive,
      image,
      capacity,
      ticketsAvailable,
      categoryId
    }

    this.dbService.addEvent(anEvent).subscribe({  // must subscribe because http is asynchronous
      next: (data: any) => { this.router.navigate(["/list-events"]) },  // redirect to the list events component
      error: (error) => { // if an error occurs 
        console.log(error); 
        if (error.status === 400) {
          this.router.navigate(['/invalid-data']);  // redirect to Invalid Data component if server status 400
        }
        return error;
      }  
    })
  
  }
}
