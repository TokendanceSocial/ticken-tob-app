import dynamic from 'next/dynamic';
import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Root from '../Root';
const Events = dynamic(() => import('../Events'), {
  ssr: false,
});

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        path: 'dashboard',
        element: <div />,
      },
      {
        path: 'events',
        element: <Events />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
