import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="Home">
            <div className={"flex-horizontal navbar"}>
                <div className={"flex-grow"}>
                    <Link to={"/flights"}>
                        <p><b>Search for flights</b></p>
                    </Link>
                </div>
                <div className={"flex-grow"}>
                    <Link to={"/bookings/view/all"}>
                        <p><b>View and Manage Bookings</b></p>
                    </Link>
                </div>
            </div>
            <p>Welcome to Dairy Flats airport!</p>
            <p>James Coburn - 19044568 2023 - Semester 1</p>
        </div>
    );
}

export default Home;
