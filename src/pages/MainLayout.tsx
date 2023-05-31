import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";

const MainLayout: React.FC = (): JSX.Element => {
    return (
        <div style={{backgroundColor: 'yellow'}}>
            <Header/>
            <Outlet />
            <br />
            <button>
                <Link to='/'>Back</Link>
            </button>
            <Footer/>
        </div>
    );
};

export default MainLayout;