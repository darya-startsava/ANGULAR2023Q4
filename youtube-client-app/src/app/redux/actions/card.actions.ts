import { createAction, props } from "@ngrx/store";

import { CustomCard } from "../state.models";

export const createCard = createAction(
    "[AdminPage Component] createCard",
    props<{ id: string; createdCard: CustomCard }>()
);
