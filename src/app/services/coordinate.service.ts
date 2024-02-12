import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from '../interfaces/coordinate';
import { PdfService } from './pdf.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService {

  private baseUrl = environment.serverApiRoot;

  public currentCoordinates = signal<Coordinate[]>([]);

  public trainingCoordinates: Coordinate[] = [
    {name: "Training Coordinate: Top Left", convertedX: 50, convertedY: 50},
    {name: "Training Coordinate: Top Right", convertedX: 5600, convertedY: 50},
    {name: "Training Coordinate: Middle", convertedX: 2775, convertedY: 3600},
    {name: "Training Coordinate: Bottom Left", convertedX: 50, convertedY: 7250},
    {name: "Training Coordinate: Bottom Right", convertedX: 5600, convertedY: 7250}
  ];

  constructor(
    private http: HttpClient,
    private pdfService: PdfService
  ) { 
    this.http.get<Coordinate[]>(`${this.baseUrl}/coordinates/${this.pdfService.currentPdf().id}`)
      .pipe(takeUntilDestroyed())
      .subscribe(
        coordinates => this.currentCoordinates.set(coordinates)
      )
   }

  addCoordinate(coordinate: Coordinate): void {
    this.http.post<Coordinate>(`${this.baseUrl}/coordinates`, coordinate).subscribe(
      coordinate => this.currentCoordinates.update(coordinates => {
        let ret: Coordinate[] = coordinates;
        ret.push(coordinate);
        return ret;
      })
    )
  }

  delete(coordinateId: number) {
    this.http.delete(`${this.baseUrl}/coordinates/${coordinateId}`).subscribe({
      next: () => {
        this.currentCoordinates.update(
          coordinates => coordinates.filter(coordinate => coordinate.id !== coordinateId)
        )
      },
      error: () => {
        throw new Error(`Delete of Id ${coordinateId} failed`)
      }
    })
  }
}
