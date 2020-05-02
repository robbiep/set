import React from "react";
import { render } from "react-dom";
import SocketProvider from "./components/Socket/SocketProvider";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const renderApp = App => {
    render(
      <SocketProvider>
        <App/>
      </SocketProvider>,
      document.getElementById("root")
    );
}

renderApp(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
