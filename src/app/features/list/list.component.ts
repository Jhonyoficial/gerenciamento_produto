import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  preserveWhitespaces: true,
})
export class ListComponent {

  ngOnInit() {
    this.requestProducts();
  }

  products: Product[] = [];
  productService = inject(ProductsService);
  router = inject(Router);
  dialog = inject(MatDialog);

  requestProducts() {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  openDialog(product: Product): void {
    this.dialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter((ok) => ok))
    .subscribe(() => {
        this.productService.delete(product.id).subscribe(() => {
          this.requestProducts();
        });
    });
  }
}

@Component({
  selector: 'app-confimate-dialog',
  template: `<h2 mat-dialog-title>Delete file</h2>
  <mat-dialog-content>
    Deseja realmente deletar esse produto?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close (click)="onCancel()">Cancelar</button>
    <button mat-raised-button mat-dialog-close cdkFocusInitial (click)="onDelete()" color="warn">
    Deletar
  </button>
  </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent { 
  matDialogRef = inject(MatDialogRef);

  onCancel(){
    this.matDialogRef.close(false)
  }

  onDelete(){
    this.matDialogRef.close(true)
  }
}

