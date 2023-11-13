import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {
  events: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.dbService.listEvents().subscribe((data: any) => {
      this.events = data;  // assign the data retrieved from the API to the events array
    });  
  }

  onDeleteEvent(eventId: string) { 
    this.dbService.deleteEvent({id: eventId}).subscribe((data: any) => { // pass the id to the deleteEvent method
      console.log(data);
      this.ngOnInit();
    });
  }

}
