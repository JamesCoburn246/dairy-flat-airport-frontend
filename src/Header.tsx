import {Link} from "react-router-dom";
import React from "react";

function Header() {
    return (
        <header>
            <Link to='/'>
                <h1>Dairy Flats Airlines</h1>
            </Link>
        </header>
    );
}

export default Header;
