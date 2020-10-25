import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";

function renderReactElement() {
    const element = (
        <div>
            <App />
        </div>
    );
    ReactDOM.render(element, document.getElementById("react-deep-tree"));
}
renderReactElement();