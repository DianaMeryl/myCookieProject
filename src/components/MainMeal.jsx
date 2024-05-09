import React from 'react';
import useFetchMeal from '../hooks/useFetchMeal';
import CardComponent from './CardComponent';
import PaginationComponent from './PaginationComponent';


export default function MainMeal({userId}) {

    const { meals, loading} = useFetchMeal();

if (loading) {
    return <p>Loading...</p>;
}

if (!meals || meals.length === 0) {
    return <p>No meals found.</p>;
}
    return (
        <div style={{ background: 'rgba(136, 216, 192)' }}>
            <CardComponent meals={meals} userId={userId}/>
            <PaginationComponent />
        </div>
    );
}
