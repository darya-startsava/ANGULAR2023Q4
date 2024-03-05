import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { SearchResultService } from "src/app/youtube/services/search-result.service";

import {
    searchVideoById,
    searchVideoByIdSuccess
} from "../actions/search.actions";

@Injectable()
export class SearchVideoByIdEffects {
    videoItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(searchVideoById),
            mergeMap((action) =>
                this.searchResultService.getItemById(action.id).pipe(
                    map((data) => searchVideoByIdSuccess({ data })),
                    catchError(() => of(null))
                )
            )
        );
    });

    constructor(
        private actions$: Actions,
        private searchResultService: SearchResultService
    ) {}
}
