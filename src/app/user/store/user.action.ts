import {createAction, props}  from '@ngrx/store';
import { Product } from '../types/user.types';

//bicycleLoad in user side 
export const loadBicycle=createAction('[loadBicycle]Bicycle')
export const loadBicyclepass=createAction('[loadBicycle]BicyclePass', props<{Bicycle:any}>())

