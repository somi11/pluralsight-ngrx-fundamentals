import { Component } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selectors';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts)
  total = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  //showProductCode = true;
  errorMessage = '';

  constructor(private productsService: ProductsService , private store : Store) {
    this.store.subscribe((store) => console.log(store))
  }

  ngOnInit() {
    this.getProducts();
     }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts())
    this.productsService.getAll().subscribe({
      next: (products) => {
       this.store.dispatch(ProductsApiActions.productLoadedSuccess({products}))
       
     
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    //this.showProductCode = !this.showProductCode;
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
}
}
