import MainLayout from "@/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
          onError={() => console.error("Google SDK yuklanmadi")}
        />
        <Component {...pageProps} />
        <ToastContainer />
      </MainLayout>
    </QueryClientProvider>
  );
}