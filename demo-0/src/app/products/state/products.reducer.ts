import { createReducer, on } from "@ngrx/store";
import { ProductsApiActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";
import { state } from "@angular/animations";

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}
const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: ""
};
export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, state => ({
    ...state,
    showProductCode: !state.showProductCode
  })),
  on(ProductsPageActions.loadProducts, state => ({
    ...state,
    products: [],
    errorMessage: "",
    loading: true
  })),
  on(ProductsApiActions.productLoadedSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products: products
  })),
  on(ProductsApiActions.productLoadedFail, (state, { message }) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false
  })),
  on(ProductsPageActions.addProduct, state => ({
    ...state,
    loading: true,
    errorMessage: ""
  })),
  on(ProductsApiActions.productAddedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product]
  })),
  on(ProductsApiActions.productAddedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProductsPageActions.updateProduct, state => ({
    ...state,
    loading: true,
    errorMessage: ""
  })),
  on(ProductsApiActions.productUpdatedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map(existingProduct =>
      existingProduct.id === product.id ? product : existingProduct
    )
  })),
  on(ProductsApiActions.productUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProductsPageActions.deleteProduct, state => ({
    ...state,
    loading: true,
    errorMessage: ""
  })),
  on(ProductsApiActions.productDeletedSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter(
      existingProduct => existingProduct.id !== id
    )
  })),
  on(ProductsApiActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  }))
);
