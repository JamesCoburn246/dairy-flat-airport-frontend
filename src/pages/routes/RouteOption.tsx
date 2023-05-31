import {Route} from "../../types";
import React from "react";
import {Link} from "react-router-dom";

interface Props {
    route_option: Route[]
}
const style = {
    borderStyle: 'groove',
    padding: '2px 4px'
}
function RouteOption(props: Props) {

    if (props.route_option) {
        return (
            <li className={"route-item flex-horizontal"} style={style}>
                <div className={"flex-stay"}>
                    <ul>
                        {props.route_option?.map((route) => {
                            return (
                                <li className={"route-sub-item"} key={route.origin + route.destination}>
                                    {route.origin}-{route.destination}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={"flex-grow"}>
                    <p>{props.route_option[0].depart} - {props.route_option[props.route_option.length-1].arrive}</p>
                    <p>{props.route_option.length === 1 ? (props.route_option.length + " flight") : (props.route_option.length + " flights")}</p>
                    <hr/>
                    <Link to={"/book"}>
                        <button>Book</button>
                    </Link>
                </div>
            </li>
        );
    } else {
        return (<div></div>);
    }
}

export default RouteOption;
