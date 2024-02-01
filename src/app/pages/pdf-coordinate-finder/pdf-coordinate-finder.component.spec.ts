import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCoordinateFinderComponent } from './pdf-coordinate-finder.component';

describe('PdfCoordinateFinderComponent', () => {
  let component: PdfCoordinateFinderComponent;
  let fixture: ComponentFixture<PdfCoordinateFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfCoordinateFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfCoordinateFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
