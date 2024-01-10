import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BicycleComponent } from "../bicycle/bicycle.component";
import { productState } from "./user.state";
import { bicycle } from "../types/user.types";


const product = createFeatureSelector<bicycle[]>('productlist')


export const ProductData = createSelector(product, (state) => {
    return state
}) 