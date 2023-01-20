namespace NodeJS {
  interface Process {
    env: {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET?: string;
      NEXT_PUBLIC_ENABLE_TESTNETS?: string;
    }
  }
}