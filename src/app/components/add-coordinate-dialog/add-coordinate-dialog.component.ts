import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, } from '@angular/material/dialog';
import { Coordinate } from '../../interfaces/coordinate';
import { PdfService } from '../../services/pdf.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoordinateService } from '../../services/coordinate.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-coordinate-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './add-coordinate-dialog.component.html',
  styleUrl: './add-coordinate-dialog.component.css'
})
export class AddCoordinateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCoordinateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public coordinate: Coordinate,
    public pdfService: PdfService,
    public coordinateService: CoordinateService
  ) {}

  isTrainingCoordinate: boolean = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.coordinateService.addCoordinate(this.coordinate)
    this.dialogRef.close();
  }

  trainingCoordinateToggled(isTrainingCoordinate: boolean): void {
    this.isTrainingCoordinate = isTrainingCoordinate
    if (!isTrainingCoordinate) {
      this.coordinate.name = ""
      this.coordinate.convertedX = undefined
      this.coordinate.convertedY = undefined
    }
  }

  trainingCoordinateSet(trainingCoordinate: Coordinate) {
    this.coordinate.name = trainingCoordinate.name
    this.coordinate.convertedX = trainingCoordinate.convertedX
    this.coordinate.convertedY = trainingCoordinate.convertedY
  }
}
