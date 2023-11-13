import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css'],
})
export class DisplayCategoryComponent {
  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoryDetails = params;
    });
    this.dbService.getEventsWithCategoryId(this.categoryDetails.id).subscribe({
      next: (data: any) => {
        this.eventCategories = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  displayEvent(event: any) {
    console.log(event.id);
    this.router.navigate(['/display-event'], { queryParams: { id: event.id } });
  }

  eventCategories: any[] = [];
  categoryDetails: any = {
    id: '',
    name: '',
    description: '',
    image: '',
  };
}
