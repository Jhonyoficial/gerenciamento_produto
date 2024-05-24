import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  form = new FormGroup({
    title: new FormControl<String>(this.product.title, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    this.productService.put(this.product.id, {
      title: this.form.controls.title.value,
    }).subscribe(() => {
      this.openSnackbar();
    });
  }

  openSnackbar(){
    this.matSnackBar.open('Produto editado com sucesso!', 'ok', {});
    this.router.navigate(['/']).catch(console.log);
  }

}
