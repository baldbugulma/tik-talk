import {createSelector} from "@ngrx/store";
import {profileFeature} from "./reducer";

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles)=> profiles
)

export const selectFilters = createSelector(
  profileFeature.selectProfileFilters,
  (profileFilters)=> profileFilters
)

export const selectMe = createSelector(
  profileFeature.selectMe,
  (me)=> me
)
