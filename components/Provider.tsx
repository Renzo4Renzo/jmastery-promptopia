"use client";

import { SessionProvider } from "next-auth/react";
import { SessionProviderProps } from "next-auth/react/types";

const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionProviderProps["session"] | null | undefined;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
