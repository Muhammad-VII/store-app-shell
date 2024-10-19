import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shell';
}
