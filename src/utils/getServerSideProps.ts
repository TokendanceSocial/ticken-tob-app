import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;

  return {
    props: {
      address,
      session,
    },
  };
}