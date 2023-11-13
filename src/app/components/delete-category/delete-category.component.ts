import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css'],
})
export class DeleteCategoryComponent {
  constructor(private dbService: DatabaseService, private router: Router) {}

  eventCategories: any[] = [];

  ngOnInit(): void {
    this.dbService.getCategories().subscribe((data: any) => {
      this.eventCategories = data;
    });
  }

  onDeleteCategory(categoryId: number) {
    this.dbService
      .deleteCategory({ categoryId: categoryId })
      .subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      });
  }
}
