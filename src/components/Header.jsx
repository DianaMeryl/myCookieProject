import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function Header() {

  const currentUser = useSelector(state => state.currentUser);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const navigate = useNavigate();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Home', value: '1' },
    { name: 'My favorite list', value: '2' },
  ];


  const handleLogin = () => {
    history("/login");
  };

  const handleRegistration = () => {
    history("/home");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history('/');
  };
  
  const handleGoToFavorite = () => {
    navigate('/favorite');
};

const handleGoToHome = () => {
    navigate('/meals');
};
  return (
    <>
    <Navbar style={{ backgroundColor: '#88d8c0' }}>
      <Container>
        <Navbar.Brand href="#home" className="title">Сooking Is Easy</Navbar.Brand>
      <Navbar.Text>
          {isLoggedIn ? (
            <div style={{display:'flex', flexDirection:"row", gap:"20px",}}>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    style={{  maxHeight: '45px', marginTop:'15px', fontSize: '18px', border:'none' }}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-success'}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    onClick={radio.name === 'My favorite list' ?  handleGoToFavorite : handleGoToHome}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <div style={{display:'flex', flexDirection:"column"}}>
                <p style={{ marginRight: '10px' }}>Вітаємо, {currentUser.name}!</p>
                <Button onClick={handleLogout} size="sm" style={{ fontSize: '18px' }}>Вийти</Button>
              </div>
            </div>
          ) : (
            <div>
              <Button variant="outline-success" onClick={handleRegistration} style={{ marginRight: '10px', color: 'white', fontSize: '18px' }}>Зареєструватися</Button>
              <Button variant="success" onClick={handleLogin} style={{ fontSize: '18px' }}>Увійти</Button>
            </div>
          )}
</Navbar.Text>
      </Container>
    </Navbar>
    </>
  )
}
