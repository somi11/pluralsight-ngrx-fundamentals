import { createAction, createReducer, on } from "@ngrx/store";

export interface ProductsState {
    showProductCode : boolean


}
const initialState : ProductsState = {
    showProductCode : true,
    
}
export  const productsReducer = createReducer(
    initialState ,
    on(createAction('[Products Page] Toggle  show Product Code'), (state) => ({
       ...state,
        showProductCode : !state.showProductCode,
    }))
)