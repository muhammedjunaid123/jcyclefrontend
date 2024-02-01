import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BicycleComponent } from "../bicycle/bicycle.component";
import { productState } from "./user.state";
import { bicycle, datePickerT } from "../types/user.types";


const product = createFeatureSelector<bicycle[]>('productlist')
const datePiker =createFeatureSelector<datePickerT>('datepiker')


export const ProductData = createSelector(product, (state) => {
    return state
}) 

export const  datepikerData = createSelector(datePiker,(state)=>{
    return state
})