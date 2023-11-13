import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G2StatsComponent } from './g2-stats.component';

describe('G2StatsComponent', () => {
  let component: G2StatsComponent;
  let fixture: ComponentFixture<G2StatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [G2StatsComponent]
    });
    fixture = TestBed.createComponent(G2StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
