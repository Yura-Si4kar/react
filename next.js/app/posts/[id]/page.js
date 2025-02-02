import Post from "@/app/components/Post";

async function fetchData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const result = await res.json();
  return result
}

export default async function Details({ params }) {
  let post = await fetchData(params.id);
  return (
    <div className="post">
      <Post post={ post } />
    </div>
  )
}