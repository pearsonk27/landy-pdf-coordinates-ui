import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Observable, of } from 'rxjs';
import { Pdf } from '../../interfaces/pdf';
import { PdfService } from '../../services/pdf.service';

@Component({
    selector: 'app-pdf-coordinate-finder',
    standalone: true,
    templateUrl: './pdf-coordinate-finder.component.html',
    styleUrl: './pdf-coordinate-finder.component.css',
    imports: [PdfViewerModule, CommonModule]
})
export class PdfCoordinateFinderComponent {

  public pdf$: Observable<Pdf | undefined> = of(undefined);
  public pdfData$: Observable<Uint8Array | undefined> = of(undefined);

  constructor(
    private pdfService: PdfService
  ) { }

  public ngOnInit(): void {
    this.pdfService.getPdfData$().subscribe(pdfData => {
      this.pdfData$ = pdfData.arrayBuffer()
      console.log(this.pdfData$)
    })
    this.pdf$ = this.pdfService.getPdfByName$("pdf-test.pdf")
  }

  addOnClick($event: MouseEvent) {
    if ($event) {
      console.log("x: %d, y: %d", $event.offsetX, $event.offsetY)
    }
  }
}
