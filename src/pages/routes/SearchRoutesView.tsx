import React, {useEffect, useState} from "react";
import {Airport, Flight, Route} from "../../types";
import RouteOption from "./RouteOption";

import '../../App.css';

const SearchRoutesView: React.FC = (): React.ReactElement => {
    const [origin, setOrigin] = useState<string>("");
    const [dest, setDest] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [airports, setAirports] = useState<Airport[]>([]);
    const [routes, setRoutes] = useState<Route[][]>([]);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dropdownOpened, setDropdown] = useState<boolean>(false);

    // Fetch initial airport data.
    useEffect(() => {
        if (airports.length === 0) {
            fetch(`http://localhost:4000/api/airports`)
                .then((result) => {
                    if (result.ok)
                        result.json().then((json) => setAirports(json));
                });
        }
    });

    // Fetch route information.
    useEffect(() => {
        if (origin.length === 4 && dest.length === 4 && date !== "") {
            console.log(origin, dest, date);
            fetch(`http://localhost:4000/api/routes?from=${origin}&to=${dest}&date=${date}`)
                .then((result) => {
                    if (result.ok)
                        result.json().then((json) => setRoutes(json));
                });
        }
    }, [origin, dest, date]);

    return (
        <div>
            <h1>Search For Routes</h1>

            {/** Flight filters. **/}
            <div>
                <h2>Filter Flights</h2>
                <label htmlFor={"origin-airport"}>From</label>
                <select
                    id={"origin-airport"}
                    onChange={(event) => setOrigin(event.target.value)}
                    defaultValue={""}
                >
                    <option value={""} key={"default"} disabled>Select an airport</option>
                    {airports?.map((airport: Airport) => {
                        return (
                            <option value={airport.icao} key={airport.icao}>{airport.name} ({airport.icao})</option>
                        );
                    })}
                </select>

                <label htmlFor={"dest-airport"}>To</label>
                <select
                    id={"dest-airport"}
                    onChange={(event) => setDest(event.target.value)}
                    defaultValue={""}
                >
                    <option value={""} key={"default"} disabled>Select an airport</option>
                    {airports?.map((airport: Airport) => {
                        return (
                            <option value={airport.icao} key={airport.icao}>{airport.name} ({airport.icao})</option>
                        );
                    })}
                </select>

                <label htmlFor={"date"}>Date of Departure:</label>
                <input type={"date"} onChange={(event) => safeSetDate(event.target.value)}/>
            </div>
            {/** End flight filters. **/}

            {/** Date, name, and email fields. **/}
            <div>
                <h2>Customer Details</h2>
                <form>
                    <label htmlFor={"name"}>Name:</label>
                    <input type={"text"} id={"name"} onChange={(event) => setName(event.target.value)}/>
                    <label htmlFor={"email"}>Email:</label>
                    <input type={"email"} id={"email"} onChange={(event) => setEmail(event.target.value)}/>
                </form>
            </div>
            {/** End date, name, and email fields. **/}

            {/** Route options. **/}
            {routes?.length > 0 &&
                <div>
                    <h2>Route Options:</h2>
                    <ul>
                        {routes?.map((option: Route[], index: number) =>
                            <RouteOption key={option[0].route_id}
                                         route_option={option}
                                         index={index}
                                         date={date}
                                         callback={bookFlightCallback}/>
                        )}
                    </ul>
                </div>
            }
            {/** End route options. **/}
        </div>
    );

    function dateToString(date: Date) {
        return date.toISOString().split('T')[0];
    }

    function safeSetDate(date: string): void {
        const result: any = new Date(date);
        if (!isNaN(result) && result instanceof Date)
            setDate(dateToString(result));
    }

    function bookFlightCallback(routes: Route[]) {
        if (date === "" || name === "" || email === "") {
            alert("Please complete all fields before booking a flight.");
        } else {
            requestBooking(routes);
        }
    }

    function requestBooking(routes: Route[]) {
        const flights: Flight[] = [];
        routes.forEach((route: Route) => {
            flights.push({
                flight_id: undefined,
                route: route,
                date: date,
            });
        });
        fetch('http://localhost:4000/api/booking', {
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'flights': flights,
                'name': name,
                'email': email
            }),
        }).then((response) => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        }).catch((e) => {
            console.error(e);
        });
    }
};

export default SearchRoutesView;
