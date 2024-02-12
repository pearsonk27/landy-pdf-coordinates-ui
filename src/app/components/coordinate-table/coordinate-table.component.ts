import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CoordinateService } from '../../services/coordinate.service';
import { Coordinate } from '../../interfaces/coordinate';

@Component({
  selector: 'app-coordinate-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordinate-table.component.html',
  styleUrl: './coordinate-table.component.css'
})
export class CoordinateTableComponent {

  public displayedColumns: (keyof Coordinate)[] = [ "name", "x", "y", "convertedX", "convertedY" ]

  constructor(
    public coordinateService: CoordinateService
  ) { }

  getPropValue(dto: Coordinate, propName: keyof Coordinate) {
    return dto[propName]
  }

  onDelete(coordinateId: number | undefined) {
    if (!coordinateId)
    {
      throw new Error('Method not implemented.');
    }
    this.coordinateService.delete(coordinateId)
  }
}
