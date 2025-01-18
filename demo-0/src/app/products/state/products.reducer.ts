import { createReducer, on } from "@ngrx/store";
import { ProductsApiActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";
import { state } from "@angular/animations";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}
const adaptor : EntityAdapter<Product> = createEntityAdapter<Product>({})
const initialState: ProductsState = adaptor.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: ""
})
export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, state => ({
    ...state,
    showProductCode: !state.showProductCode
  })),
  on(ProductsPageActions.loadProducts, state =>
     adaptor.setAll ([],{
    ...state,
    errorMessage: "",
    loading: true
  })),
  on(ProductsApiActions.productLoadedSuccess, (state, { products }) =>
   adaptor.setAll (products  ,{
    ...state,
    loading: false
  })),
  on(ProductsApiActions.productLoadedFail, (state, { message }) => adaptor.setAll ([],{
    ...state,
    errorMessage: message,
    loading: false
  })),
  on(ProductsPageActions.addProduct, state => ({
    ...state,
    loading: true,
    errorMessage: ""
  })),
  on(ProductsApiActions.productAddedSuccess, (state, { product }) => adaptor.addOne (  product,{
    ...state,
    loading: false,
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
  on(ProductsApiActions.productUpdatedSuccess, (state, { update }) => adaptor.updateOne (update ,{
    ...state,
    loading: false,
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
  on(ProductsApiActions.productDeletedSuccess, (state, { id }) => adaptor.removeOne ( id,{
    ...state,
    loading: false
  })),
  on(ProductsApiActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  }))
);

const {
selectAll,
selectEntities
} = adaptor.getSelectors();

export const selectProductEntities = selectEntities
export const selectProducts = selectAll;