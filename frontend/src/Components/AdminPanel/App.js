import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import AddProduct from './AddProduct/AddProduct';
import ListProduct from './ListProduct/ListProduct';
import Sidebar from './Sidebar/Sidebar';
import React from 'react';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/addproduct' element={<AddProduct/>}/>
    <Route path='/listproduct' element={<ListProduct/>}/>
   
    <Route path='/sidebar' element={<Sidebar/>}/>
    </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;
