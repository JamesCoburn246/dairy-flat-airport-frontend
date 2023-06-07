import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";

function MainLayout(): React.ReactElement {
    return (
        <>
            <Header/>
            <div id={"main"}>
                <Outlet />
            </div>
            <Footer/>
        </>
    );
}

export default MainLayout;