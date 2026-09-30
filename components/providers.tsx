"use client";

import { BookingProvider } from "@/lib/booking";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ubook-theme"
    >
      <BookingProvider>{children}</BookingProvider>
    </ThemeProvider>
  );
}
