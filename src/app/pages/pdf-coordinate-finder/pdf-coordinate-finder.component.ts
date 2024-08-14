import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfService } from '../../services/pdf.service';
import { BlobToInt8arrayPipe } from '../../pipes/blob-to-int8array.pipe';
import { AddCoordinateDialogComponent } from '../../components/add-coordinate-dialog/add-coordinate-dialog.component';
import { CoordinateService } from '../../services/coordinate.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoordinateTableComponent } from '../../components/coordinate-table/coordinate-table.component';

@Component({
    selector: 'app-pdf-coordinate-finder',
    standalone: true,
    templateUrl: './pdf-coordinate-finder.component.html',
    styleUrl: './pdf-coordinate-finder.component.css',
    imports: [PdfViewerModule, CommonModule, MatIconModule, BlobToInt8arrayPipe, MatTableModule, CoordinateTableComponent]
})
export class PdfCoordinateFinderComponent {

  constructor(
    public pdfService: PdfService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void { }

  addOnClick($event: MouseEvent) {
    if ($event) {
      this.dialog.open(AddCoordinateDialogComponent, {
        data: {x: $event.offsetX, y: $event.offsetY, pdfId: this.pdfService.currentPdf().id},
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.pdfService.upload(file)
    }
  }

  regressCoordinates() {
    this.pdfService.regressCoordinates();
  }
}
