"use client";

import { GlobalProvider } from "@/context/globalContext";
import React from "react";
import Header from "./Header";
import LoadingOverlay from "./LoadingOverlay";

export default function GlobalWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <Header />
      <div>{children}</div>
      <LoadingOverlay />
    </GlobalProvider>
  );
}
