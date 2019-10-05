import React from 'react';
//import logo from './logo.svg';
import './App.css';

const a = ["Book 1","Book 2", "Book 3"];
const b = ["Description 1", "hajkdlfhukjahsdkljfhajklsdhfkjhakjsdhfkjahsdj\nkflhajklsdhfjkhajkdsfhjkahdsjkfhajkldhfk\njahsjkdfhkjashdkjfhakjdshfkjahsdkjfhkljahsdkjfhajklsdhfkjlhaskjldhfkjlashd\nfjklhasjkldhfkjlashdjklfhajksldhfkjshadjkf","Description 3"];

function App() {
  return (
    
      
      <div className="container-fluid">
      <nav class="navbar navbar sticky-top navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="#">BookStore</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
             <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Options</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Wishlist</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                 <a class="dropdown-item" href="#">Wishlist 1</a>
                 <a class="dropdown-item" href="#">Wishlist 2</a>
                 <a class="dropdown-item" href="#">Wishlist 3</a>
              </div>
            </li>
          </ul>
    </div>
    </nav>

    <ul>
      {
        a.map( (x,i) => {
           return (
             <div class = "row">
             <div class= "col-sm-1"><image src="holder.js/171x180" rounded /></div>
             <div class="col-sm-1">{x}</div>
              <div class = "col-sm-8">{b[i]}</div>
              <div class="col-sm-1">
               <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Options <span class="caret"></span></button>
                  <ul class="dropdown-menu">
                    <li><a href="#">Wishlist 1</a></li>
                    <li><a href="#">Wishlist 2</a></li>
                    <li><a href="#">Wishlist 3</a></li>
                  </ul>
                </div></div>
             </div>

           );
        })}
    </ul>
      
    </div>  
     
    
  );
}

export default App;
