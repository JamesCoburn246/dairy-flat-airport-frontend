// React.
import React from 'react';
import {Navigate, useRoutes} from 'react-router-dom';

// Directories.
import MainLayout from "./pages/MainLayout";
import Home from './pages/home/Home';
import SearchFlightsView from "./pages/routes/SearchRoutesView";
import CreateBookingView from './pages/bookings/CreateBookingView';
import ViewBookingsView from "./pages/bookings/ViewBookingsView";
import CancelBookingView from "./pages/bookings/CancelBookingView";
import PageNotFoundView from "./pages/PageNotFoundView";

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
            {path: 'bookings/view', element: <ViewBookingsView />},
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
