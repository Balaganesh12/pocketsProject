import { useEffect, useState } from "react";
import { AppShell, Header, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { NhostClient, NhostProvider } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { inspect } from '@xstate/inspect'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import { BACKEND_URL } from '../helpers'
import '../styles/globals.scss'
import '../assets/scss/main.scss'

import { Button, Container, Input, Title } from '@mantine/core'
import Login from './login'
import NotificationBar from "./NotificationBar/NotificationBar";

const devTools = typeof window !== 'undefined' && !!process.env.NEXT_PUBLIC_DEBUG
if (devTools) {
  inspect({
    url: 'https://stately.ai/viz?inspect',
    iframe: false
  })
}
const nhost = new NhostClient({ backendUrl: BACKEND_URL, devTools });
function MyApp({ Component, pageProps }: AppProps) {

  const [isauth, setauth] = useState(null)


  useEffect(() => {

    const item = localStorage.getItem('auth')

    setauth(item)

  }, [Component, pageProps])


  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <Head>
          <title>Pockets</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>
        </Head>

        {/* <div className="pockets_container">
          <NavBar />
          <div className="mainContent">
          
          </div>
          <NotificationBar />
        </div> */}
        <Component {...pageProps} />
        {/* {
          isauth ? <div className="pockets_container">
            <NavBar />
            <div className="mainContent">
              <Component {...pageProps} />
            </div>
            <NotificationBar />
          </div> : <Login />

        } */}

        {/* <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ 
            colorScheme: 'light'
          }}
        >
          <NotificationsProvider>
           
          </NotificationsProvider>
        </MantineProvider> */}

      </NhostApolloProvider>
    </NhostProvider>
  )
}

export default MyApp
