import '@/styles/globals.css'
import App, { AppProps } from 'next/app.js'
import Layout from '@components/layout'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
