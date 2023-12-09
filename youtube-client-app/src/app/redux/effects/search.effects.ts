import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
    catchError,
    debounceTime,
    filter,
    map,
    mergeMap
} from "rxjs/operators";
import { SearchResultService } from "src/app/youtube/services/search-result.service";

import { searchSuccess, searchVideos } from "../actions/search.actions";

@Injectable()
export class SearchEffects {
    searchInput$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(searchVideos),
            debounceTime(500),
            filter((action) => action.searchInput.length >= 3),
            mergeMap((action) =>
                this.searchResultService.getData(action.searchInput).pipe(
                    map((data) =>
                        searchSuccess({
                            data,
                            nextPageToken:
                                this.searchResultService.nextPageToken$.value,
                            prevPageToken:
                                this.searchResultService.prevPageToken$.value
                        })
                    ),
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
