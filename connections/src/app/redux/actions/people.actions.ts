import { createAction, props } from '@ngrx/store';

import {
    ErrorState,
    PeopleDataState
} from '../state.models';

export const peopleLoading = createAction(
    '[PeoplePageContainerComponent] peopleLoading'
);

export const peopleSuccess = createAction(
    '[PeoplePageContainerComponent] peopleSuccess',
    props<{ data: PeopleDataState[] }>()
);

export const peopleFailed = createAction(
    '[PeoplePageContainerComponent] peopleFailed',
    props<{ error: { error: ErrorState } }>()
);

export const peopleUpdate = createAction(
    '[PeoplePageContainerComponent] peopleUpdate',
    props<{ currentDate: number }>()
);
