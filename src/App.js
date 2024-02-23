import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pagination from './components/Pagination';

function App() {
  return (
    <>
      
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/'
            element={
              <>
                <Banner />
                <Movies />
              </>
            } />
          <Route path='/WatchList' element={<WatchList />} />

        </Routes>

      </BrowserRouter>
     

    </>


  );
}

export default App;
