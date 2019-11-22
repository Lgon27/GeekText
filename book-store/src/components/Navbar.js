import React from 'react';
import { Link } from 'react-router-dom'
 const Navbar = ()=>{
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">BOOK STORE</Link>

                    <ul className="right">
                        <li><Link to="/">SHOP</Link></li>
                        <li><Link to="/cart">MY CART</Link></li>
                        <li><Link to="/login">LOG IN</Link></li>
                        <li><Link to="/signup"> SIGN UP</Link></li>
                    </ul>
                </div>
            </nav>


    )
}

export default Navbar;
