import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const selectUserState = createFeatureSelector<UserState>('user')

export const selectUserEmail = createSelector(
    selectUserState,
    (state) => state.email
)

export const selectUserRoles = createSelector(
    selectUserState,
    (state) => state.roles
)