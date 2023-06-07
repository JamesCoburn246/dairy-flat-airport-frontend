// React.
import React from "react";
import {Link} from "react-router-dom";

// MUI.
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

// Types.
import {Booking, Flight} from "../../types";

interface Props {
    booking: Booking,
    index: number,
    email: string | undefined
}

function BookingItem(props: Props) {
    const b: Booking = props.booking;
    return (
        <li key={b.booking_id} className={"booking-item"}>
            <div className={"flex-vertical"}>
                <div className={"flex-stay"}>
                    <h2>Booking Reference: <Link to={'/bookings/view/' + b.booking_id}>{b.booking_id}</Link></h2>
                </div>
                <div>
                    ${b.total_price}
                </div>
                <div className={"flex-stay"}>
                    <ul>
                        {b.flights.map((flight: Flight, index: number) => {
                            return (
                                <li key={index} className={"booking-sub-item"}>
                                    <h3>Flight {flight.route.route_id}</h3>
                                    <p>{flight.date}</p>
                                    <p><FlightTakeoffIcon /> at {flight.route.origin} airport on {flight.route.depart}</p>
                                    <p><FlightLandIcon /> at {flight.route.destination} airport on {flight.route.arrive}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {props.email &&
                <button onClick={(event: React.MouseEvent) => cancelBooking(event, props.booking.booking_id)}>
                    Cancel Booking
                </button>
            }
            {!props.email &&
                <Link to={'/bookings/view/all'}>
                    <button>
                        Login to Cancel Booking
                    </button>
                </Link>
            }
        </li>
    );

    function cancelBooking(event: React.MouseEvent, booking_id: string) {
        event.preventDefault();
        fetch(`http://localhost:4000/api/booking?id=${booking_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': props.email
            })
        }).then((result: Response) => {
                if (result.ok) {
                    result.json().then(() => {
                        window.location.reload();
                    });
                } else {
                    console.log("Received response when fetching booking: " + result.status + " " + result.statusText);
                }
            });
    }
}

export default BookingItem;
