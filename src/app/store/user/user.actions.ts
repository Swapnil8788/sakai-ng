import { createAction, props } from "@ngrx/store";

export const setUser = createAction(
    '[User] Set User',
    props<{ email: string; roles: string[] }>()

)