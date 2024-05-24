import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: Product) {
    this.productService.put(this.product.id, product).subscribe(() => {
      this.openSnackbar();
    });
  }

  openSnackbar() {
    this.matSnackBar.open('Produto editado com sucesso!', 'ok', {});
    this.router.navigate(['/']).catch(console.log);
  }

}
