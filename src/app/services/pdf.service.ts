import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs';
import { Pdf } from '../interfaces/pdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllPdfs$() {
    return this.http.get<Pdf[]>('/assets/mocks/pdfs.json').pipe(delay(1000));
  }

  public getPdfByName$(text: string) {
    return this.getAllPdfs$().pipe(
      map(pdfs => pdfs.filter(pdf => pdf.name.toLowerCase().includes(text.toLowerCase())).at(0))
    );
  }

  public getPdfData$() {
    return this.http.get('/assets/pdfs/AddCyl3001Testing.pdf', { responseType: 'blob' })
    .pipe(
      tap( res => console.log('HTTP response:', res)),
      tap(console.log)
  )
  }
}
