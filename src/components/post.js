import Link from "next/link";

function Post({post}) {
  return (
    <div>
      <span>
        {post.id}
      </span>
      {" : "}
      <Link href={`/posts/${post.id}`}>
      <span className="cursor-pointer border-b hover:text-blue-500">{post.title}</span>
      </Link>
    </div>
  );
}

export default Post;