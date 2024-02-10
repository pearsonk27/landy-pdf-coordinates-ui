import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordinateDialogComponent } from './add-coordinate-dialog.component';

describe('AddCoordinateDialogComponent', () => {
  let component: AddCoordinateDialogComponent;
  let fixture: ComponentFixture<AddCoordinateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCoordinateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCoordinateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
