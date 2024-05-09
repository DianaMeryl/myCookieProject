import React from 'react'
import { useState, useEffect } from 'react';


export default function useFetchMeal() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);  

    const getMeals = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            const data = await response.json();
            setMeals(data.meals);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMeals();
    }, []); 

    return { meals, loading, getMeals}; 
}

