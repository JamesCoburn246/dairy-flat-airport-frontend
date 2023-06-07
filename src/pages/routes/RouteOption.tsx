// React.
import React from "react";

// MUI.
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

// Types.
import {Route} from "../../types";

interface Props {
    route_option: Route[],
    index: number,
    date: string,
    callback: Function
}
function RouteOption(props: Props) {

    if (props.route_option) {
        const ro: Route[] = props.route_option;
        return (
            <li className={"route-item"}>
                <div className={"flex-horizontal"}>
                    <div className={"flex-stay"}>
                        <h2>Route {props.index+1}</h2>
                        <p><FlightTakeoffIcon />{ro[0].depart} - {ro[ro.length-1].arrive}<FlightLandIcon /></p>
                        <p>{ro.length === 1 ? (ro.length + " flight") : (ro.length + " flights")} in this route</p>
                        <hr/>
                        <button className={"flex-horizontal"} onClick={() => {
                            props.callback(ro)
                        }}>
                            <AirplaneTicketIcon /> <p>Book Route</p>
                        </button>
                    </div>
                    {ro?.map((route: Route, index: number) => {
                        return (
                            <div className={"flight-item flex-stay"}>
                                <ul>
                                    <li className={"route-sub-item"} key={route.origin + route.destination}>
                                        <h2>Flight {index+1} [{route.route_id}]</h2>
                                        <p><FlightTakeoffIcon /> <b>{route.origin}</b></p>
                                        <p><FlightLandIcon /> <b>{route.destination}</b></p>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </li>
        );
    } else {
        return (<div></div>);
    }
}

export default RouteOption;
