import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";

const MainLayout: React.FC = (): JSX.Element => {
    return (
        <>
            <Header/>
            <div id={"main"}>
                <Outlet />
            </div>
            <Footer/>
        </>
    );
};

export default MainLayout;