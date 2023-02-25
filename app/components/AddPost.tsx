"use client"
import { useState } from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import toast from 'react-hot-toast';


// useMutation (CRUD function)

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();

	let toastPostID: string

	// Create a post
	//first params = function (can be an async)
	const {mutate} = useMutation(
		async (title:string) => {
			return await axios.post('/api/posts/addPost', {title})
		}, {
			onError: (error) => {
				if(error instanceof AxiosError){
					toast.error(error?.response?.data.message, {id:toastPostID})
				}
				setIsDisabled(false)
			},
			onSuccess: (data) => {
				toast.success('Post has been made', {id: toastPostID})
				console.log(data);
				// invalidate query refetches data 
				// which reloads the content for us to be able to 
				// see our new post
				queryClient.invalidateQueries(["posts"])
				setTitle('')
				setIsDisabled(false)
			}
		}

	)
	
	const submitPost = async(e:React.FormEvent) => {
		e.preventDefault()
		// loading popup
		toastPostID = toast.loading("Creating your post", {id: toastPostID})
		setIsDisabled(true)
		
		// call mutate
		mutate(title)
	}

	return (
		<form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md" >
			<div className="flex flex-col my-4">
				<textarea 
					onChange={(e) => setTitle(e.target.value)} 
					name="title" 
					value={title}
					placeholder="What's on your mind?"
					className="p-4 text-lg rounded-md my-2 bg-gray-200"
				>
				</textarea>
			</div>

			<div className={`flex items-center justify-between gap-2 `}>
				<p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
				<button 
					disabled={isDisabled}
					type="submit" 
					className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25">Create a Post</button>
			</div>
		</form>
	)
}

export default CreatePost