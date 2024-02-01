import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfCoordinateFinderComponent } from './pages/pdf-coordinate-finder/pdf-coordinate-finder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfCoordinateFinderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landy-pdf-coordinates-ui';
}
