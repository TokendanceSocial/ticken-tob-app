import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const transactions = await serverSideTranslations(context.locale, [
    'common',
  ]);
  const address = token?.sub ?? null;

  return {
    props: {
      address,
      session,
      ...transactions,
    },
  };
}