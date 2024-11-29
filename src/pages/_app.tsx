import "@/styles/globals.css";
import type {AppProps} from "next/app";

import {ThemeProvider} from "@/components/ThemeProvider";
import ToastWrapper from "@/components/ui/ToastWrapper"; // Import ToastWrapper

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastWrapper />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
