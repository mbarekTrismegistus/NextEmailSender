// import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import TanstackProvider from "@/tanstackProvider";
import { Providers } from "./providerNextUi";
import Header from "./header";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';
import ScriptSpline from "./script";
import localFont from 'next/font/local'

const myFont = localFont({ src: '../public/Manrope.ttf' })


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {


  return (
    <TanstackProvider>
        <html lang="en">
          <body className={`bg-bgImage ${myFont.className}`}>
            <NextTopLoader showSpinner={false}/>
            <SessionProvider>
              <Providers>
                <Header/>
                {children}
              </Providers>
            </SessionProvider>
            <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.93/build/spline-viewer.js"></script>
            <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/trefoil.js"></script>
          </body>
          <ScriptSpline/>
        </html>
    </TanstackProvider>
  );
}
