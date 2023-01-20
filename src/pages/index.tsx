import type { NextPage } from 'next';

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/events',
      permanent: false,
    },
  };
};
const Home: NextPage = () => {
  return null;
};

export default Home;
