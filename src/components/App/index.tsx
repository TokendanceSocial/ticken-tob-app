import { Skeleton, ConfigProvider } from 'antd';
import dark from 'antd/lib/theme/themes/dark';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { useAccount, useNetwork } from 'wagmi';
import Root from '../Root';

const Events = dynamic(() => import('../Events'), {
  ssr: false,
});

const CreateEvent = dynamic(() => import('../Events/Create'), {
  ssr: false,
});

const EventDetail = dynamic(() => import('../Events/Detail'), {
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
          {
            path: 'detail',
            element: <EventDetail />,
          },
        ],
      },
    ],
  },
]);
export default function App() {
  const session = useSession();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  if (session.status === 'authenticated' && isConnected && !chain?.unsupported) {
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
