'use client'

import AddPost from "./components/AddPost";
import Post from "./components/Post";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PostsType } from "./types/Posts";

//Fetch all posts
const allPosts = async() => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data;
}

export default function Home() {
  //queryKey will be used for intelligent caching
  const {data, error, isLoading} = useQuery<PostsType[]>(
    {
      queryFn: allPosts, 
      queryKey: ["posts"],
    })

  if(error) return error
  if(isLoading) return "Loading...."
  return (
    <main className="text-3xl font-bold">
      <AddPost/>
      {data?.map((post) => {
        return(
          <Post
            key={post.id}
            id={post.id}
            name={post.user.name} //author associated with post
            avatar={post.user.image} // avatar associated with post
            postTitle={post.title}
            comments={post.comments}
          />
        )
      })}
    </main>
  )
}
