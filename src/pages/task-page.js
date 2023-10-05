import Layout from "@/components/Layout";
import StateContextProvider from "@/context/StateContext";
import Task from "@/components/Task";
import { getAllTasksData } from "@/lib/tasks";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import TaskForm from "@/components/TaskForm";

const fetcher = (url) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`

const TaskPage = ({staticFilteredTasks}) => {
  const {data: task, mutate} = useSWR(apiUrl, fetcher, {
    fallbackData: staticFilteredTasks
  })
  const filteredTasks = task?.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

  useEffect(() => {
    mutate();
  },[])
  return (
    <StateContextProvider>
    <Layout title="Task Page">
      <TaskForm taskCreated={mutate}/>
      <ul>
        {filteredTasks && filteredTasks.map((task) => <Task key={task.id} task={task} taskDeleted={mutate}/>)}
      </ul>
      <Link className="mt-8" href="mainpage">
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
    </StateContextProvider>
  );
}

export async function getStaticProps() {
  const staticFilteredTasks = await getAllTasksData();
  return {
    props: {staticFilteredTasks},
    revalidate: 3
  }
}

export default TaskPage;