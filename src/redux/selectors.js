import { createSelector } from 'reselect';

const selectUserState = (state) => state.users;

export const selectUserFavorites = createSelector(
  [selectUserState, (_, userId) => userId], 
  (userState, userId) => userState[userId]?.favoriteMeal || []
);


