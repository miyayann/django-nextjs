import Layout from '@/components/Layout'
import { getAllTasksIds, getTaskData } from '@/lib/tasks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Post = ({tasks, id}) => {
  const router = useRouter()
  const {data: task, mutate} = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      fallbackData: tasks,
    },
    useEffect(() => {
      mutate();
    }, [])
  )

  if(router.isFallback || !task) {
    return <div>Loading...</div>
  }
  return (
    <Layout title={task.title}>
      <p className='mb-2'>{"ID : "}{task.id}</p>
      <p className='mb-2'>{task.title}</p>
      <p className='mb-2'>{task.created_at}</p>
      <p className='max-w-screen-lg'>{task.content}</p>
      <Link href="/task-page">
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
  const paths = await getAllTasksIds();

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const tasks = await getTaskData(params.id)

  return {
    props: {
      id: tasks.id,
      tasks
    },
    revalidate: 3,
  }
}

export default Post
