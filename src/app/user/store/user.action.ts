import {createAction, props}  from '@ngrx/store';
import {  datePickerT } from '../types/user.types';


//bicycleLoad in user side 
export const loadBicycle=createAction('[loadBicycle]Bicycle')
export const loadBicyclepass=createAction('[loadBicycle]BicyclePass', props<{Bicycle:any}>())

export const loaddatePiker=createAction('[loaddatePiker]datePiker')
export const datePiker =createAction('[datePiker]Rent',props<{datePickerval:datePickerT}>())

