import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BreadcrumbHistory from '../BreadcrumbHistory';

export default function Root() {
  const router = useRouter();
  const naviagate = useNavigate();
  useEffect(() => {
    if (router.pathname === '/') {
      naviagate('events');
      return;
    }
    naviagate(router.asPath.split('#')[1]);
  }, [router, naviagate]);

  return (
    <Suspense fallback={<Skeleton active />}>
      <BreadcrumbHistory />
      <Outlet />
    </Suspense>
  );
}
