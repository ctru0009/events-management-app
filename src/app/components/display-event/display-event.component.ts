import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent {

  id: string = "";
  events: any[] = [];
  eventDetail: any = {
    id: '',
    name: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    image: '', 
    duration: '',
    isActive: '',
    capacity: '',
    ticketsAvailable: '',
    categoryId: '',
  };

  constructor(private dbService: DatabaseService, private router: Router) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.id = this.router.parseUrl(this.router.url).queryParams['id']; // get the id from the url
    this.dbService.displayEvent(this.id).subscribe({
      next: (data: any) => {this.eventDetail = data},  // assign the data retrieved from the API to the eventDetail object
      error: (error) => { console.log(error) }
    })
  }

}
