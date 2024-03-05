import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
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
import { selectCustomItems } from "../selectors/currentPageItems.selectors";
import { AppState } from "../state.models";

@Injectable()
export class SearchEffects {
    searchInput$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(searchVideos),
            debounceTime(500),
            filter((action) => action.searchInput.length >= 3),
            concatLatestFrom(() => this.store.select(selectCustomItems)),
            mergeMap(([action, customItemsState]) =>
                this.searchResultService
                    .getData(action.searchInput, "", customItemsState.length)
                    .pipe(
                        map((data) =>
                            searchSuccess({
                                data,
                                nextPageToken:
                                    this.searchResultService.nextPageToken$
                                        .value,
                                prevPageToken:
                                    this.searchResultService.prevPageToken$
                                        .value,
                                input: action.searchInput
                            })
                        ),
                        catchError(() => of(null))
                    )
            )
        );
    });

    constructor(
        private actions$: Actions,
        private searchResultService: SearchResultService,
        private store: Store<AppState>
    ) {}
}
