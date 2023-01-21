import type { NextPage } from 'next';
export { default as getServerSideProps } from '@/utils/getServerSideProps';

import dynamic from 'next/dynamic';
import TickenLayout from '@/components/Layout';

const AppComponentWithNoSSR = dynamic(() => import('../components/App'), { ssr: false });
function Page() {
  return (
    <TickenLayout>
      <AppComponentWithNoSSR />
    </TickenLayout>
  );
}

export default Page;
