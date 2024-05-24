import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Product[]>('http://localhost:3000/products')
  }

  get(id: string) {
    return this.httpClient.get<Product>(`http://localhost:3000/products/${id}`)
  }


  post(payload: ProductPayload){
    return this.httpClient.post('http://localhost:3000/products', payload);
  }

  put(id: String, payload: ProductPayload){
    return this.httpClient.put(`http://localhost:3000/products/${id}`, payload);
  }

  delete(id: String){
    return this.httpClient.delete(`http://localhost:3000/products/${id}`);
  }
}
