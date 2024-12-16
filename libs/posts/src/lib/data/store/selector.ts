import {createSelector} from "@ngrx/store";
import {postsFeature} from "./reducer";

export const selectFilteredProfiles = createSelector(
  postsFeature.selectPosts,
  (posts)=> posts
)
