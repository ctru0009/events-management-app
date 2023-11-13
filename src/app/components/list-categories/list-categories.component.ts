import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
})
export class ListCategoriesComponent {
  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.getCategories().subscribe((data: any) => {
      this.eventCategories = data;
    });
  }
  eventCategories: any[] = [];

  navigateToDisplayCategory(category: any) {
    this.router.navigate(['/display-category'], {
      queryParams: category,
    });
  }
}
