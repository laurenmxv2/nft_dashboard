import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import createEmotionCache from '@utils/createEmotionCache'
import theme from '@styles/theme'
import { Toaster } from 'react-hot-toast'
import { MetaMaskProvider } from '@contexts/MetaMaskContext'

const clientSideEmotionCache = createEmotionCache()

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>NFT Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta charSet="utf-8" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-right" />
        <MetaMaskProvider>
          <Component {...pageProps} />
        </MetaMaskProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
