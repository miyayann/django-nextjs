import Layout from "@/components/Layout";
import Post from "@/components/post";
import { getAllPostsData } from "@/lib/posts";
import Link from "next/link";

const BlogPage = ({filteredPosts}) => {
  return (
    <Layout title="Blog Page">
      <ul className="mb-8">
        {filteredPosts.map((post) => <Post key={post.id} post={post}/>)}
      </ul>
      <Link href="mainpage">
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
  );
}

export async function getStaticProps() {
  const filteredPosts = await getAllPostsData();
  return {
    props: {filteredPosts},
    revalidate: 3
  }
}

export default BlogPage;