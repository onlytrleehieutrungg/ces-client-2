import { AppPropsWithLayout } from '@/@types'
import { EmptyLayout } from '@/components/layouts'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
