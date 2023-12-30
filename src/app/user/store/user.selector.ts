import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BicycleComponent } from "../bicycle/bicycle.component";
import { productState } from "./user.state";


const product = createFeatureSelector<any>('productlist')


export const ProductData = createSelector(product, (state) => {
    return state
}) 