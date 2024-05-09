import React from 'react';
import useFetchMeal from '../hooks/useFetchMeal';
import CardComponent from './CardComponent';
import PaginationComponent from './PaginationComponent';


export default function MainMealForStart() {

const { meals, loading } = useFetchMeal();


if (loading) {
    return <p>Loading...</p>;
}

if (!meals || meals.length === 0) {
    return <p>No meals found.</p>;
}

return (
    <div style={{ height: '100vh', background: 'rgba(136, 216, 192)' }}>
        <CardComponent meals={meals} />
        <PaginationComponent />
    </div>
);
}
