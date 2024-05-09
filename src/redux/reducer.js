import React from 'react';
import { SET_CURRENT_USER, LOGOUT_USER, REGISTER_USER_SUCCESS, SET_SEARCH_QUERY, SET_SEARCH_RESULTS, REMOVE_FAVORITE, ADD_USERSID_FAVORITE, SET_POPOVER_VALUE, SET_CURRENT_PAGE, SET_LIMIT_CARDS_ONPAGE } from './actionTypes';

const initialState = {
    currentPage: 5,
    limitCards: 3,
    currentUser: [],
    isLoggedIn: false, 
    searchQuery: '', 
    searchResults: [], 
    popoverValue: null,
    users: {}
};

function addFavoriteMealsToUser(st, id, favorite) {
    
    const userFavorites = st.users[id]?.favorite || [];
    
    const updatedFavorites = [...userFavorites];

    favorite.forEach(meal => {
        updatedFavorites.push(meal);
    });
    
    return {
        ...st,
        users: {
            ...st.users,
            [id]: {
                ...st.users[id],
                favoriteMeal: updatedFavorites
            }
        }
    };
}

function removeFavoriteMealsToUser(st, id, elemId) {
    const user = st.users[id];
    if (!user || !user.favoriteMeal) {
        return st;
    }

    return {
        ...st,
        users: {
            ...st.users,
            [id]: {
                ...st.users[id],
                favoriteMeal: user.favoriteMeal.filter(item => item.idMeal !== elemId)
            }
        }
    };
}

export default function userReducer(state=initialState, action) {

    switch(action.type){
        case SET_CURRENT_USER:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                currentUser: action.payload
            };
        case SET_CURRENT_PAGE:
                return {
                    ...state,
                    currentPage: action.payload
                };
        case SET_LIMIT_CARDS_ONPAGE:
            return {
                ...state,
                limitCards: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                isLoggedIn: false,
            };
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload,
            };
        case ADD_USERSID_FAVORITE:

            return addFavoriteMealsToUser(state, action.payload.userId, action.payload.favoriteMeal);
            
        case REMOVE_FAVORITE:

            return removeFavoriteMealsToUser(state, action.payload.userId, action.payload.itemId);

        case SET_POPOVER_VALUE:
            return {
                ...state,
                popoverValue: action.payload,
            };
        default:
            return state;
    }
}

