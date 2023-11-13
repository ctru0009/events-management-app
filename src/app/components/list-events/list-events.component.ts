import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent {
  events: any[] = []; 

  constructor(private dbService: DatabaseService, private router: Router) {
    this.getEventList(); // call the method to get the list of events
  }

  getEventList() {  
    this.dbService.listEvents().subscribe({  
      next: (data: any) => {   
        this.events = data;  //assign the data to the events array
        console.log(this.events);
      },
      error: (error) => { console.log(error) }  // if an error occurs
    })
  }

  displayEvent(event: any) {
    // navigate to the display event component
    // passes the id with the value of event.id to the component
    this.router.navigate(['/display-event'], { queryParams: {id: event.id} });
  }

}
