
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

        

export function Providers({children}) {
  return (
    <NextUIProvider>
      <ProgressBar
        height="3px"
        color="#10b981"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <NextThemesProvider attribute="class" defaultTheme='dark'>
        <PrimeReactProvider>
          {children}
        </PrimeReactProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}