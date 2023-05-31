import React, {useEffect, useState} from "react";
import {Airport, Route} from "../../types";
import RouteOption from "./RouteOption";

import '../../App.css';

const SearchRoutesView: React.FC = (): JSX.Element => {
    const [origin, setOrigin] = useState<String>("");
    const [dest, setDest] = useState<String>("");
    const [date, setDate] = useState<String>(dateToString(new Date()));
    const [airports, setAirports] = useState<Airport[]>([]);
    const [routes, setRoutes] = useState<Route[][]>([]);

    // Fetch initial airport data.
    useEffect(() => {
        if (airports.length === 0) {
            fetch(`http://localhost:4000/api/airports`)
                .then(result => result.json())
                .then((json) => {
                    setAirports(json);
                });
        }
    });

    // Fetch route information.
    useEffect(() => {
        if (origin.length === 4 && dest.length === 4) {
            fetch(`http://localhost:4000/api/routes?from=${origin}&to=${dest}&date=${date}`)
                .then(result => result.json())
                .then((json) => {
                    setRoutes(json);
                });
        }
    }, [origin, dest, date]);

    return (
        <div>
            <h1>Search For Routes</h1>

            {
                /** Dropdown menus. **/
            }
            <div>
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

                {
                    /** Dropdown menu. **/
                }
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
            </div>
            <div>
                <h3>Date of Travel</h3>
                <form id={"form"}>
                    <input type={"date"} onChange={(event) => safeSetDate(event.target.value)}/>
                </form>
                <p>{date}</p>
            </div>

            <div>
                <h2>Route Options:</h2>
                <ul>
                    {routes?.map((option: Route[]) => {
                        return (<RouteOption route_option={option}/>);
                    })}
                </ul>
            </div>
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
};

export default SearchRoutesView;
