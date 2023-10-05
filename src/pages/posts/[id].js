import Layout from '@/components/Layout'
import { getAllPotsIds, getPostData } from '@/lib/posts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Post = ({post}) => {
  const router = useRouter()

  if(router.isFallback || !post) {
    return <div>Loading...</div>
  }
  return (
    <Layout title={post.title}>
      <p className='mb-2'>{"ID : "}{post.id}</p>
      <p className='mb-2'>{post.title}</p>
      <p className='mb-2'>{post.created_at}</p>
      <p className='max-w-screen-lg'>{post.content}</p>
      <Link href="/blog-page">
      <div class='button w-16 h-16 bg-blue-500 rounded-full cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841]
            border-[1px] border-blue-400
            '>
		<span class='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Back</span>
	</div>
      </Link>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPotsIds();

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const post = await getPostData(params.id)

  return {
    props: {
      post
    },
    revalidate: 3,
  }
}

export default Post
