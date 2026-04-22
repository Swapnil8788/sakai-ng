import { createReducer, on } from "@ngrx/store";
import { intialUserState } from "./user.state";
import { setUser } from "./user.actions";

export const userReducer = createReducer(
    intialUserState,
    on(setUser, (state, { email, roles }) => {
        return {
            ...state,
            email,
            roles
        }
    })
)