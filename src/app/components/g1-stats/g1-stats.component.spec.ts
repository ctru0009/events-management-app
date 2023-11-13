import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G1StatsComponent } from './g1-stats.component';

describe('G1StatsComponent', () => {
  let component: G1StatsComponent;
  let fixture: ComponentFixture<G1StatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [G1StatsComponent]
    });
    fixture = TestBed.createComponent(G1StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
