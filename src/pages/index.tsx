import type { NextPage } from 'next';
export { default as getServerSideProps } from '@/utils/getServerSideProps';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const AppComponentWithNoSSR = dynamic(() => import('../components/App'), { ssr: false });
function Page() {
  return (
    <div>
      <Header />
      <AppComponentWithNoSSR />
    </div>
  );
}

export default Page;
