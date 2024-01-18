import {createReducer,on} from '@ngrx/store'
import {  bicycle } from '../types/user.types'
import * as UserAction from './user.action'
 
const ProductinitialSate:bicycle[]=[]
const datePikerRent:any=[]

export const loadBicyclepage= createReducer(
    ProductinitialSate,
  
    on(UserAction.loadBicyclepass, (state,{Bicycle}) => {
        return [...Bicycle]

        
    })
)

export const datePiker= createReducer(
    datePikerRent,
    on(UserAction.datePiker,(state,{datePickerval})=>{
     return{...datePickerval}
   
    }
)
)
