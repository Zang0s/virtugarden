import { getSession } from "next-auth/react";

import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function ProtectedPage() {
  return <h1>Tylko dla zalogowanych użytkowników!</h1>;
}
