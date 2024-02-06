import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Observable, of } from 'rxjs';
import { Pdf } from '../../interfaces/pdf';
import { PdfService } from '../../services/pdf.service';
import { BlobToInt8arrayPipe } from '../../pipes/blob-to-int8array.pipe';

@Component({
    selector: 'app-pdf-coordinate-finder',
    standalone: true,
    templateUrl: './pdf-coordinate-finder.component.html',
    styleUrl: './pdf-coordinate-finder.component.css',
    imports: [PdfViewerModule, CommonModule, MatIconModule, BlobToInt8arrayPipe]
})
export class PdfCoordinateFinderComponent {

  public pdf$: Observable<Pdf | undefined> = of(undefined);
  public pdfData$: Observable<Uint8Array | undefined> = of(undefined);

  constructor(
    private pdfService: PdfService
  ) { }

  public ngOnInit(): void { }

  addOnClick($event: MouseEvent) {
    if ($event) {
      console.log("x: %d, y: %d", $event.offsetX, $event.offsetY)
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.pdf$ = this.pdfService.upload(file)
    }
  }
}
