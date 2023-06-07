// React.
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

// Components.
import BookingItem from "./BookingItem";

// Pages.
import PageNotFoundView from "../PageNotFoundView";

// Types.
import {Booking} from "../../types";

// View all existing bookings.
// Cancel a booking.

function SingleBookingView() {

    const {booking_id} = useParams();

    const [bookingInfo, setBookingInfo] = useState<Booking>();

    useEffect(() => {
        if (booking_id !== undefined) {
            fetch(`http://localhost:4000/api/booking?id=${booking_id}`)
                .then((result: Response) => {
                    if (result.ok) {
                        result.json().then((json) => {
                            setBookingInfo(json);
                        });
                    } else {
                        console.log("Received response when fetching booking: " + result.status + " " + result.statusText);
                    }
                });
        }
    }, [booking_id]);

    // List a specific booking view.
    return (
        <>
            {bookingInfo &&
                <>
                    <h1>View Booking</h1>
                    <BookingItem booking={bookingInfo} index={0} email={undefined} />
                </>
            }
            {!bookingInfo &&
                <PageNotFoundView />
            }
        </>
    );
}

export default SingleBookingView;
