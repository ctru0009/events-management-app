import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent {
  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.getCategories().subscribe((data: any) => {
      this.eventCategories = data;
    });
  }

  eventCategories: any[] = [];

  categoryId: string = '';
  categoryName: string = '';
  categoryDescription: string = '';
  categoryImage: string = '';

  setData(id: string, name: string, description: string, image: string) {
    this.categoryId = id;
    this.categoryName = name;
    this.categoryDescription = description;
    this.categoryImage = image;
  }

  updateCategory() {
    // Check name is character and number only

    if (!this.categoryName.match(/^[a-zA-Z0-9]+$/)) {
      this.router.navigate(['/invalid-data']);
    } else {
      this.dbService
        .updateCategory({
          categoryId: this.categoryId,
          name: this.categoryName,
          description: this.categoryDescription,
          image: this.categoryImage,
        })
        .subscribe((data: any) => {
          console.log(data);
        });
      this.ngOnInit();
    }
  }
}
