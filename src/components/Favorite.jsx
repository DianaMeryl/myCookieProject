import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import '../index.css'
import Modal from "./Modal";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import {addFavorite} from '../redux/actions';
import {removeFavorite} from '../redux/actions';
import { selectUserFavorites } from '../redux/selectors';
// import {addFavoriteMeal} from '../redux/actions';

export default function Favorite({userId}) {

    const favoriteMeal = useSelector(state => selectUserFavorites(state, userId) );

    const [showIngredients, setShowIngredients] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const dispatch = useDispatch();

function removeFromUserFavorites(itemId) {
    const userFavorites = JSON.parse(localStorage.getItem(`userFavorites_${userId}`)) || [];
    const updatedFavorites = userFavorites.filter(item => item.idMeal !== itemId);

    localStorage.setItem(`userFavorites_${userId}`, JSON.stringify(updatedFavorites));

    dispatch(removeFavorite(userId, itemId));
}

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
    

    return (  
        <div  style={{background: 'rgba(136, 216, 192)' }}>
        <InputGroup className="mb-3">
            <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
            <Button>Search</Button>
        </InputGroup>

        <div style={{display:'flex', justifyContent: 'center', flexWrap:"wrap", gap:"35px", padding:"20px 55px"}}> 
            { favoriteMeal.map(item => (
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
                <Button variant="link" onClick={() => removeFromUserFavorites(item.idMeal)}>
                    Remove
                </Button>
                </Card.Body>
                </Card>
            ))}
        </div>
    </div>
    );
}
