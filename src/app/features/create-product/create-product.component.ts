import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})

export class CreateProductComponent {

  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(produto: Product) {
    this.productService.post(produto).subscribe(() => {
      this.openSnackbar();
    });
  }

  openSnackbar() {
    this.matSnackBar.open('produto adicionado com sucesso!', 'ok', {});
    this.router.navigate(['/']).catch(console.log);
  }
}
