import React from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root')
createRoot(rootElement).render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
