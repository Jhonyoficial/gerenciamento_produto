import { Component, EventEmitter, Output, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  product = input.required<Product>()

  @Output() edit = new EventEmitter(); 
  @Output() delete = new EventEmitter();

  onDelete(){
    this.delete.emit()
  }

}
