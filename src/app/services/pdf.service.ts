import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Pdf } from '../interfaces/pdf';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private baseUrl = environment.serverApiRoot;

  public currentPdf = signal<Pdf>({ name: "", coordinates: [], id: 0, data: ""});

  public pdfs = signal<Pdf[]>([]);

  constructor(
    private http: HttpClient
  ) { 
    this.http.get<Pdf[]>(`${this.baseUrl}/pdfs`)
      .pipe(takeUntilDestroyed())
      .subscribe(
        pdfs => this.pdfs.set(pdfs)
      )
  }

  upload(file: File): void {
    const formData: FormData = new FormData();

    formData.append('file', file);

    this.http.post<Pdf>(`${this.baseUrl}/upload`, formData).subscribe(
      currentPdf => {
        this.currentPdf.set(currentPdf)
        this.pdfs.update(pdfs => {
          let ret: Pdf[] = pdfs.slice(0, 4)
          ret.unshift(currentPdf)
          return ret;
        })
      }
    );
  }

  public getAllPdfs$() {
    return this.http.get<Pdf[]>(`${this.baseUrl}/pdfs`);
  }

  public getPdfByName$(text: string) {
    return this.getAllPdfs$().pipe(
      map(pdfs => pdfs.filter(pdf => pdf.name.toLowerCase().includes(text.toLowerCase())).at(0))
    );
  }

  public getPdfById$(id: number) {
    return this.http.get<Pdf>(`${this.baseUrl}/pdfs/${id}`);
  }

  public getPdfData$() {
    return this.http.get('/assets/pdfs/AddCyl3001Testing.pdf', { responseType: 'blob' })
    .pipe(
      tap( res => console.log('HTTP response:', res)),
      tap(console.log)
  )
  }
}
