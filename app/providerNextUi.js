
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import {ThemeProvider as NextThemesProvider} from "next-themes";

        

export function Providers({children}) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        <PrimeReactProvider>
          {children}
        </PrimeReactProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}