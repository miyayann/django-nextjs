import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const MainPage = () => {
  const router = useRouter()
  const logout = () => {
    cookie.remove('access_token');
    router.push("/")
  }
  return (
    <Layout title="Main Page">
      <div className='flex mr-4 mb-8'>
      <Link className='p-10 mr-5 bg-indigo-600 text-white flex justify-center items-center rounded-lg hover:bg-indigo-400 cursor-pointer' href="blog-page">
        blog SSG + ISR
      </Link>
      <Link className='p-10 bg-gray-600 text-white flex justify-center items-center rounded-lg hover:bg-gray-400 cursor-pointer' href="task-page">
        Task SSG + CSR
      </Link>
      </div>
    <div className='button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400 '>
      <button className='flex flex-col w-full justify-center items-center h-full text-white font-bold text-lg ' onClick={logout}>ログアウト</button>
    </div>
    </Layout>
  )
}

export default MainPage
