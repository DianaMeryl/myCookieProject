import { SET_CURRENT_USER, LOGOUT_USER, REGISTER_USER_SUCCESS, SET_SEARCH_QUERY, SET_SEARCH_RESULTS, REMOVE_FAVORITE, ADD_USERSID_FAVORITE, SET_POPOVER_VALUE, SET_CURRENT_PAGE, SET_LIMIT_CARDS_ONPAGE } from './actionTypes';


export const setCurrentPage = (page) => { 
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};

export const setLimitCardsOnPage = (limit) => { 
    return {
        type: SET_LIMIT_CARDS_ONPAGE,
        payload: limit,
    };
};

export const setCurrentUser = (user) => { 
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    };
};

export const registerUserSuccess = (userData) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: userData
    }
};

export const setSearchQuery = (text) => ({
    type: SET_SEARCH_QUERY,
    payload: text,
});

export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    payload: results,
});
export const addFavoriteMeal = (userId, favoriteMeal) => ({
    type: ADD_USERSID_FAVORITE, 
    payload: { userId, favoriteMeal }
});

export const removeFavorite = (userId, itemId) => ({
    type: REMOVE_FAVORITE, 
    payload: { userId, itemId}
});

export const setPopoverValue = (value) => ({
    type: SET_POPOVER_VALUE,
    payload: value,
});

