import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import Login from './components/Login';
import Details from './components/Details';
import { Routes, Route } from 'react-router-dom';
import MainMeal from "./components/MainMeal";
import Layout from './layout/Layout';
import Favorite from './components/Favorite';
import { useSelector } from 'react-redux';
import SearchResults from "./components/SearchResults";
import React, { Suspense } from 'react';


const LazyMainMeal = React.lazy(() => import('./components/MainMealForStart'));


function App() {

  const currentUser = useSelector(state => state.currentUser) || {};

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={ <Suspense fallback={<div>Loading...</div>}><LazyMainMeal /></Suspense>} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/meals" element={<MainMeal userId={currentUser && currentUser.email}/>} />
            <Route path="/details" element={<Details />} />
            <Route path="/favorite" element={<Favorite userId={currentUser && currentUser.email} />} />
            <Route path="/search-results" element={<SearchResults userId={currentUser && currentUser.email}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
