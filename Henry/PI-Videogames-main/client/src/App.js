import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import VideogameCard from './components/VideogameCard/VideogameCard';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';
import VideogameCreate from './components/VideogameCreate/VideogameCreate';
import Resting from './components/Resting';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route strict exact path="/" element={<Landing />}/>
        <Route strict exact path="/home" element={<Home />}/>
        <Route strict exact path="/card" element={<VideogameCard />}/>
        <Route strict exact path="/search" element={<Home search={true}/>}/>
        <Route strict exact path="/create/videogame" element={<VideogameCreate />}/>
        <Route strict exact path="/videogame/:name" element={<VideogameDetail/>}/>
        <Route path="*" element={<Resting/>}/>
      </Routes>
    </div>
  )
};

export default App;
