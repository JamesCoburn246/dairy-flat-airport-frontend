// React.
import React from 'react';
import {Navigate, useRoutes} from 'react-router-dom';

// Directories.
import MainLayout from "./pages/MainLayout";
import Home from './pages/home/Home';
import PageNotFoundView from "./pages/PageNotFoundView";
import SearchFlightsView from "./pages/routes/SearchRoutesView";
import CreateBookingView from './pages/bookings/CreateBookingView';
import UserBookingsView from "./pages/bookings/UserBookingsView";
import SingleBookingView from "./pages/bookings/SingleBookingView";
import CancelBookingView from "./pages/bookings/CancelBookingView";

function App() {

    const routes = {
        path: '/',
        element: <MainLayout />,
        children: [
            {path: '*', element: <Navigate to='/404' />},
            {path: '/', element: <Home/>},
            {path: '404', element: <PageNotFoundView />},
            {path: 'flights', element: <SearchFlightsView />},
            {path: 'bookings', element: <Navigate to='/bookings/view' />},
            {path: 'bookings/create', element: <CreateBookingView />},
            {path: 'bookings/view/all', element: <UserBookingsView />},
            {path: 'bookings/view/:booking_id', element: <SingleBookingView />},
            {path: 'bookings/cancel', element: <CancelBookingView />},
        ]
    }
    // View all existing bookings.
    // Cancel a booking.
    // Search for routes.
    // Select a flight and make a booking.
    const routing = useRoutes([routes]);
    return <>{routing}</>;
}

export default App;
