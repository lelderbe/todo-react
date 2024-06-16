import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <>
        {/* <React.StrictMode> */}
        <App />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            newestOnTop={true}
            pauseOnFocusLoss={false}
            theme="colored"
        />
        {/* </React.StrictMode>, */}
    </>,
);
