import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import AddProduct from './Components/AdminPanel/AddProduct/AddProduct';
import ListProduct from './Components/AdminPanel/ListProduct/ListProduct';
import Sidebar from './Components/AdminPanel/Sidebar/Sidebar';
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
