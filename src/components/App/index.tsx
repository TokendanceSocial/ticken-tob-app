import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createHashRouter,
} from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to='about'>About Us</Link>
      </div>
    ),
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
