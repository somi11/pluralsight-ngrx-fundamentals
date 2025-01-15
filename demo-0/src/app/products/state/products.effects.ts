import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsApiActions, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productService.getAll().pipe(
          map(products =>
            ProductsApiActions.productLoadedSuccess({ products })
          ),
          catchError(error =>
            of(ProductsApiActions.productLoadedFail({ message: error }))
          )
        )
      )
    )
  );
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({ product }) =>
        this.productService.add(product).pipe(
          map(newProduct =>
            ProductsApiActions.productAddedSuccess({ product: newProduct })
          ),
          catchError(error =>
            of(ProductsApiActions.productAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productService.update(product).pipe(
          map(product =>
            ProductsApiActions.productUpdatedSuccess({ product: product })
          ),
          catchError(error =>
            of(ProductsApiActions.productUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.delete(id).pipe(
          map(() => ProductsApiActions.productDeletedSuccess({ id })),
          catchError(error =>
            of(ProductsApiActions.productDeletedFail({ message: error }))
          )
        )
      )
    )
  );
  
}
