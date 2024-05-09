import React from 'react'
import useSearch from '../hooks/useSearch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import '../index.css'
import Modal from "./Modal";
import {addFavoriteMeal} from '../redux/actions';
import {removeFavorite} from '../redux/actions';
import { selectUserFavorites } from '../redux/selectors';

export default function SearchResults({userId}) {

    const {  searchResults } = useSearch();
    const navigate = useNavigate();
    const favoriteMeal = useSelector(state => selectUserFavorites(state, userId) );
    const [clickedCards, setClickedCards] = useState({});
    const [showIngredients, setShowIngredients] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const dispatch = useDispatch();

    useEffect(() => {
        if(userId){
        const initialClickedCards = {};
        favoriteMeal.forEach(meal => {
            initialClickedCards[meal.idMeal] = true;
        });
        setClickedCards(initialClickedCards);}
    }, [favoriteMeal]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                setShowIngredients(false);
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

function addToUserFavorites(userId, newItem) {

    const existingfavoriteMeal = JSON.parse(localStorage.getItem(`userFavorites_${userId}`)) || [];

    const updatedfavoriteMeal = [...existingfavoriteMeal, newItem];

    localStorage.setItem(`userFavorites_${userId}`, JSON.stringify(updatedfavoriteMeal));

    dispatch(addFavoriteMeal(userId, updatedfavoriteMeal));
}

function removeFromUserFavorites(userId, itemId){
    const userFavorites = JSON.parse(localStorage.getItem(`userFavorites_${userId}`)) || [];
    const updatedFavorites = userFavorites.filter(item => item.idMeal !== itemId);

    localStorage.setItem(`userFavorites_${userId}`, JSON.stringify(updatedFavorites));

    dispatch(removeFavorite(userId, itemId));
}

const handleFavoriteClick = (meal) => {
    if (clickedCards[meal.idMeal]) {
        removeFromUserFavorites(userId, meal.idMeal);
    } else {
        addToUserFavorites(userId, meal);



    }
};
const handleIngredientsClick = (id) => {

    if (showIngredients && selectedItemId === id) {
        setShowIngredients(false);
        return;
    }
    setShowIngredients(true);
    setSelectedItemId(id);
};

function openModal(id){
    setIsOpen(true);
    setModalId(id);
    setButtonPosition({ x: window.scrollX, y: window.scrollY });
}
function closeModal(){
    setIsOpen(false);
    setModalId(null);
}

const handleGoToHomePage = () => {
    navigate('/meals');
};

const getIngredients = (el) => {

    let newIngredients = [];

    for (let i = 1; i <= 20; i++) {
        let ingredientKey = 'strIngredient' + i;
        let ingredient = el[ingredientKey];
        if (ingredient && ingredient !== "") {
            newIngredients.push(ingredient);
        }
    }
    return newIngredients.map((ingredient, index) => (
        <div key={index}>{ingredient}</div>
    ));
};
    return (
        <div style={{display:'flex', justifyContent: 'center', flexWrap:"wrap", gap:"35px", padding:"20px 55px"}}> 
            { searchResults.map(item => (
                <Card key={item.idMeal} style={{ width: '20rem', position: 'relative' }} className="card border-success mb-3" >
                    <Card.Img
                        variant="top"
                        src={item.strMealThumb}
                        className="cardbackgr"
                    />
                <Card.Body>
                <Card.Title className="text-center" style={{ color: '#0a7e8c ', fontSize: '25px', fontStyle: 'italic' }}>{item.strMeal}</Card.Title>
                </Card.Body>
                <Card.Body style={{display:'flex', justifyContent: 'space-between', flexWrap:"wrap", gap:"10px", padding:"10px 10px"}} className="card-footer bg-transparent border-success">
                <Button variant="outline-info" size="lg" onClick={() => handleIngredientsClick(item.idMeal)}>Ingredients</Button>
                {showIngredients && selectedItemId === item.idMeal &&(
                        <div id="move" style={{ visibility: 'visible', animation:'animmove 1s ease-out', display:"flex", flexDirection:"column" }}>
                            <span id="span-title"><em>Ingredients:</em></span>
                            <ul>{getIngredients(item)}</ul>
                        </div>
                    )}
                <Button variant="outline-warning" size="lg" onClick={() => openModal(item.idMeal)}>Description</Button>
                    {isOpen && modalId === item.idMeal && (
                        <Modal onClose={closeModal} position={buttonPosition}>
                            <div style={{ width: '600px' }} >
                            <Card.Title className="text-center" style={{ color: '#0a7e8c ', fontSize: '25px', fontStyle: 'italic' }}>{item.strMeal}</Card.Title>
                                <div style={{ display:"flex", flexDirection:"column" }}>
                                    <span id="span-title"><em>Ingredients:</em></span>
                                        <ul>{getIngredients(item)}</ul>
                                    <span id="span-title"><em>Instruction:</em></span>
                                    <div>{item.strInstructions}</div>
                                </div>
                            </div>
                        </Modal> 
                    )}
                <Card.Link href={item.strYoutube} style={{textDecoration:'none', fontSize:"18px", color:"green"}}>Youtube Video</Card.Link>
                <Button variant="link" onClick={() => handleFavoriteClick(item)} >
                    {clickedCards[item.idMeal] ?  (
                            <FcLike size="30"/>
                        )  :  (
                            <FaRegHeart size="30" />
                        ) }
                </Button>
                <Button onClick={handleGoToHomePage} style={{color:'#0a7e8c'}}>Back Home</Button>
                </Card.Body>
                </Card>
            ))}
        </div>
    );
}