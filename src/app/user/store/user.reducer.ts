import {createReducer,on} from '@ngrx/store'
import { Product } from '../types/user.types'
import * as UserAction from './user.action'
 
const ProductinitialSate:any[]=[]

export const loadBicyclepage= createReducer(
    ProductinitialSate,
  
    on(UserAction.loadBicyclepass, (state,{Bicycle}) => {
        return [...Bicycle]
    })
)

