import { Skeleton, ConfigProvider } from 'antd';
import dark from 'antd/lib/theme/themes/dark';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Root from '../Root';

const Events = dynamic(() => import('../Events'), {
  ssr: false,
});

const CreateEvent = dynamic(() => import('../Events/Create'), {
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

        children: [
          {
            index: true,
            element: <Events />,
          },
          {
            path: 'create',
            element: <CreateEvent />,
          },
        ],
      },
    ],
  },
]);
export default function App() {
  const session = useSession();
  if (session.status === 'authenticated') {
    return (
      <ConfigProvider
        theme={{
          algorithm: dark,
          token: {
            colorTextBase: '#fff',
            fontFamily: 'Poppins',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    );
  }
  return <Skeleton active />;
}
