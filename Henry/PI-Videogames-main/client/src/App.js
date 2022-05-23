import './App.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import VideogameCard from './components/VideogameCard/VideogameCard';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/card" element={<VideogameCard />}/>
        <Route path="/search" element={<Home search={true}/>}/>
      </Routes>
    </div>
  )
};

export default App;
