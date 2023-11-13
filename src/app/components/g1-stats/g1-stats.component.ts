import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-g1-stats',
  templateUrl: './g1-stats.component.html',
  styleUrls: ['./g1-stats.component.css'],
})
export class G1StatsComponent {
  categoryCount: number = 0;
  eventCount: number = 0;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dbService.getG1Stats().subscribe((data: any) => {
      this.categoryCount = data.categoryCount;
      this.eventCount = data.eventCount;
    });
  }
}
