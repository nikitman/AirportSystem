import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { App } from './App';
import { theme } from './shared/theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronUp, faChevronRight, faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronLeft, faChevronUp, faChevronRight, faChevronDown, faGlobe);

export const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
