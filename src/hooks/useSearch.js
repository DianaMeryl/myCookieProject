import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/actions';
import { setSearchResults} from '../redux/actions';
import useFetchMeal from './useFetchMeal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function useSearch(){

    const {meals, loading } = useFetchMeal();

    const navigate = useNavigate();
    
    const searchQuery = useSelector(state => state.searchQuery);
    const searchResults = useSelector(state => state.searchResults);

    const dispatch = useDispatch(); 

    useEffect(() => {
        if (!loading && searchQuery !== '') { 
            handleSearch();
        }
    }, [loading]);


    const handleSearch = () => {

        const searchWords = searchQuery.toLowerCase().split(" ");

        const searchedResult = meals.filter(item => {
            let newIngredients = [];
        
            for (let i = 1; i <= 20; i++) {
                let ingredientKey = 'strIngredient' + i;
                let ingredient = item[ingredientKey];
                if (ingredient && ingredient !== "") {
                newIngredients.push(ingredient.toLowerCase()); 
                }
            }
        
            return searchWords.some(searchWord => {
                return newIngredients.some(ingredient => ingredient.includes(searchWord));
            });
            });
        
        dispatch(setSearchResults(searchedResult));
        dispatch(setSearchQuery(''));
    };

    const handleChange = (event) => {
        dispatch(setSearchQuery(event.target.value)); 
    };

    const handleKeyOrBtnPress = (event) => {
        if (event.key === 'Enter' ||  event.type === 'click') {
            handleSearch(); 
            navigate('/search-results'); 
        }
    };  
    return { searchQuery, searchResults, handleChange, handleSearch, handleKeyOrBtnPress };
}



