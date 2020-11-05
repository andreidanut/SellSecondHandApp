import { Pipe, PipeTransform } from '@angular/core';
import { title } from 'process';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { Product } from './_models/product';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(products: Product[], search: string) {
    if (!products || !search) {
      return products;
    }

    return products.filter((product) => {
      console.log(product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      return product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()); });
  }
}
