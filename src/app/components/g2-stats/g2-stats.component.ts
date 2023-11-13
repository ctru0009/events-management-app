import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-g2-stats',
  templateUrl: './g2-stats.component.html',
  styleUrls: ['./g2-stats.component.css']
})
export class G2StatsComponent {
  createdCount: number = 0;
  updatedCount: number = 0;
  deletedCount: number = 0;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dbService.getG2Stats().subscribe((data: any) => {
      // assign the data retrieved from the API
      this.createdCount = data.createdCount;  
      this.updatedCount = data.updatedCount;
      this.deletedCount = data.deletedCount;
    });
  }

}
