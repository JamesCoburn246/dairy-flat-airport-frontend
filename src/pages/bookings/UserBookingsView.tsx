// React.
import React, {useState} from "react";

// Components.
import BookingItem from "./BookingItem";

// Types.
import {Booking} from "../../types";

function UserBookingsView() {

    const [email, setEmail] = useState<string>();
    const [userBookings, setUserBookings] = useState<Booking[]>();

    function fetchBookings(): void {
        fetch(`http://localhost:4000/api/bookings?email=${email}`)
            .then((result: Response) => {
                if (result.ok) {
                    result.json().then((json) => setUserBookings(json));
                } else {
                    console.log("Received response when fetching bookings: " + result.status + " " + result.statusText);
                }
            });
    }

    // List all bookings view.
    return (
        <>
            {/** Login Panel. **/}
            {!userBookings &&
                <>
                    <h1>View and Manage Bookings</h1>
                    <form>
                        <legend>Login to view your bookings.</legend>
                        <input type={"email"} placeholder={'J.Doe@massey.ac.nz'} onChange={(event) => setEmail(event.target.value)}/>
                        <button type={"submit"} onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            fetchBookings();
                        }}>Login</button>
                    </form>
                </>
            }

            {/** List Bookings Screen. **/}
            {userBookings &&
                <>
                    <h1>View and Manage Bookings for {email}</h1>
                    <ul>
                        {userBookings.map((booking: Booking, index: number) =>
                            <BookingItem
                                booking={booking}
                                index={index}
                                email={email}
                            />
                        )}
                    </ul>
                    <button onClick={(event) => {
                        event.preventDefault();
                        setEmail(undefined);
                        setUserBookings(undefined);
                    }}>
                        Log Out
                    </button>
                </>
            }
        </>
    );
}

export default UserBookingsView;
