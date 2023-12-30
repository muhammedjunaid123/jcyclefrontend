import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { UsersService } from '../../services/user/users.service'
import { loadBicyclepass,loadBicycle} from './user.action'



@Injectable()
export class BicycleEffects {

    constructor(private _action: Actions, private _userService: UsersService) { }

    
    loadBicycle$ = createEffect(() => this._action.pipe(ofType(loadBicycle),
        exhaustMap((action) => this._userService.loadBicycle()
        .pipe(map((Bicycle)=>{
           return loadBicyclepass({Bicycle:Bicycle})
        }),
        catchError(()=>EMPTY)
        ))))

}