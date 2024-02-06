import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Pdf } from '../interfaces/pdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private baseUrl = 'https://obscure-space-invention-rpx54xpgxq73xrrw-8080.app.github.dev';

  constructor(
    private http: HttpClient
  ) { }

  upload(file: File): Observable<Pdf> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<Pdf>(`${this.baseUrl}/upload`, formData).pipe(
      tap( res => console.log('HTTP response:', res)),
      tap(console.log)
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
