import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { SearchResultService } from "src/app/youtube/services/search-result.service";

import {
    goToNextPage,
    goToNextPageSuccess,
    goToPreviousPage,
    goToPreviousPageSuccess
} from "../actions/pagination.actions";
import { selectPagination } from "../selectors/currentPage.selectors";
import { selectCustomItems } from "../selectors/currentPageItems.selectors";
import { AppState } from "../state.models";

@Injectable()
export class PaginationEffects {
    goToNextPage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(goToNextPage),
            concatLatestFrom(() => this.store.select(selectPagination)),
            mergeMap(([action, paginationState]) => {
                if (paginationState.input.trim() !== "") {
                    return this.searchResultService
                        .getData(
                            paginationState.input,
                            this.searchResultService.nextPageToken$.value
                        )
                        .pipe(
                            map((data) => {
                                return goToNextPageSuccess({
                                    data,
                                    nextPageToken:
                                        this.searchResultService.nextPageToken$
                                            .value,
                                    prevPageToken:
                                        this.searchResultService.prevPageToken$
                                            .value,
                                    input: paginationState.input
                                });
                            }),
                            catchError(() => EMPTY)
                        );
                }
                return EMPTY;
            })
        );
    });

    goToPreviousPage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(goToPreviousPage),
            concatLatestFrom(() => [
                this.store.select(selectPagination),
                this.store.select(selectCustomItems)
            ]),
            mergeMap(([action, paginationState, customItemsState]) =>
                this.searchResultService
                    .getData(
                        paginationState.input,
                        this.searchResultService.prevPageToken$.value,
                        paginationState.currentPage === 2
                            ? customItemsState.length
                            : 0
                    )
                    .pipe(
                        map((data) => {
                            return goToPreviousPageSuccess({
                                data,
                                nextPageToken:
                                    this.searchResultService.nextPageToken$
                                        .value,
                                prevPageToken:
                                    paginationState.currentPage === 2
                                        ? ""
                                        : this.searchResultService
                                              .prevPageToken$.value,
                                input: paginationState.input
                            });
                        }),
                        catchError(() => EMPTY)
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
