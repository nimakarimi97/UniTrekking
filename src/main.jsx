import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Protected from './components/AuthLayout.jsx';
import AllHikes from './pages/AllHikes.jsx';
import AddHike from './pages/AddHike.jsx';
import EditHike from './pages/EditHike.jsx';
import Post from './pages/Post.jsx';

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
        path: '/all-posts',
        element: (
          <Protected authentication>
            <AllHikes />
          </Protected>
        ),
      },
      {
        path: '/add-post',
        element: (
          <Protected authentication>
            <AddHike />
          </Protected>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Protected authentication>
            <EditHike />
          </Protected>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <Protected authentication>
            <Post />
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
