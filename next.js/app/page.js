import Link from "next/link";

async function fetchData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const result = await res.json();
  return result
}

export default async function Home() {

  let data = await fetchData();
  
  return (
    <>
      <h1>Головна сторінка </h1>
      <div className="posts">
      {data.map((post) => (
        <div key={post.id} className="post">
          <h2>{ post.title }</h2>
          <p>{post.body}</p>
          <Link href={'/posts/' + post.id}>
           <span>Детальніше</span>
          </Link>
        </div>
      ))}
      </div>
    </>
  );
}