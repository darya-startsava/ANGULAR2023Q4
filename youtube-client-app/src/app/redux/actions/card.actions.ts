import { createAction, props } from "@ngrx/store";
import { CustomCard } from "src/app/core/models/core.models";

export const createCard = createAction(
    "[AdminPage Component] createCard",
    props<{ id: string; createdCard: CustomCard }>()
);
