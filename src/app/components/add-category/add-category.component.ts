import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

const DEFAULT_DESC = 'No description available';
const DEFAULT_IMG = '../../../assets/Event_Category_Detail.png';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {}

  categoryName: string = '';
  categoryDescription: string = '';
  categoryImage: string = '';

  addCategory() {
    this.dbService
      .addCategory({
        name: this.categoryName,
        description: this.categoryDescription
          ? this.categoryDescription
          : DEFAULT_DESC,
        image: this.categoryImage ? this.categoryImage : DEFAULT_IMG,
      })
      .subscribe((data: any) => {
        console.log(data);
        // Redirect to list-categories
        this.router.navigate(['/list-categories']);
      });
  }
}
