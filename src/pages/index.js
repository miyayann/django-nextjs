import Auth from '@/components/Auth'
import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Layout title="Login">
      <Auth/>
      </Layout>
    </>
  )
}
