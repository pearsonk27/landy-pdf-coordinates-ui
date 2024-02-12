import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateTableComponent } from './coordinate-table.component';

describe('CoordinateTableComponent', () => {
  let component: CoordinateTableComponent;
  let fixture: ComponentFixture<CoordinateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
