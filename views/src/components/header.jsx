import React, { Link } from 'react-router-dom';
import './header.css'
function Header() {
    return (
        <header className='Header'>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                </ul>
            </nav>
        </header> 
    )
}

export default Header;
