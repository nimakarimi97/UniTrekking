import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './css/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Protected from './components/AuthLayout.jsx';
import AllHikes from './pages/AllHikes.jsx';
import AddHike from './pages/AddHike.jsx';
import EditHike from './pages/EditHike.jsx';
import Hike from './pages/Hike.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },

      {
        path: '/all-hikes',
        element: (
          <Protected authentication>
            <AllHikes />
          </Protected>
        ),
      },
      {
        path: '/add-hike',
        element: (
          <Protected authentication>
            <AddHike />
          </Protected>
        ),
      },
      {
        path: '/edit-hike/:slug',
        element: (
          <Protected authentication>
            <EditHike />
          </Protected>
        ),
      },
      {
        path: '/hike/:slug',
        element: (
          <Protected authentication>
            <Hike />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
