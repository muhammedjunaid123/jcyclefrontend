import {createAction, props}  from '@ngrx/store';


//bicycleLoad in user side 
export const loadBicycle=createAction('[loadBicycle]Bicycle')
export const loadBicyclepass=createAction('[loadBicycle]BicyclePass', props<{Bicycle:any}>())

