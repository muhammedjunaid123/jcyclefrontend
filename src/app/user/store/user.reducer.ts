import {createReducer,on} from '@ngrx/store'
import {  bicycle } from '../types/user.types'
import * as UserAction from './user.action'
 
const ProductinitialSate:bicycle[]=[]

export const loadBicyclepage= createReducer(
    ProductinitialSate,
  
    on(UserAction.loadBicyclepass, (state,{Bicycle}) => {
        return [...Bicycle]
    })
)

