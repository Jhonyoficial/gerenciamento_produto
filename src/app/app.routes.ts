import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'create-product',
        loadComponent: () => import('./features/create-product/create-product.component')
        .then(m => m.CreateProductComponent),
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const productService = inject(ProductsService)
                return productService.get(route.paramMap.get('id') as string)
            },
        },
        loadComponent: () => import('./features/edit-product/edit-product.component')
        .then(m => m.EditProductComponent),
    }
];
