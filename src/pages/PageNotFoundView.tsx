// React.
import React from 'react';
import {Link} from "react-router-dom";

function PageNotFoundView(): React.ReactElement {
    return (
        <div>
            <h1>404: Page Not Found.</h1>
            <Link to={'/'}>
                <button>
                    Return Home
                </button>
            </Link>
        </div>
    );
}

export default PageNotFoundView;