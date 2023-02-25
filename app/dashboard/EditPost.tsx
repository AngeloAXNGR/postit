'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import axios from "axios"
import toast from 'react-hot-toast'


type EditProps = {
	id: string
	avatar: string
	name: string
	title: string
	comments?: {
		id:string
		postId: string
		userId: string
	}[]
}

const EditPost = ({avatar, name, title, comments, id}:EditProps) => {
	//Toggle
	const [toggle, setToggle] = useState(false);
	let deleteToastID:string
	const queryClient = useQueryClient()

	//Delete Post
	const {mutate} = useMutation(
		async (id: string) => {
			return await axios.delete('/api/posts/deletePost', {data: id})
		},
		{
			onError: (error) => {
				toast.error("Error deleting that post" , {id: deleteToastID})
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries(["auth-posts"])
				toast.success("Post has been deleted.", {id: deleteToastID})
			}
		}
	)

	const deletePost = () => {
		deleteToastID = toast.loading("Deleting your post.", {id: deleteToastID})
		mutate(id)
	}

	return (
		<>
			<div className="my-8 p-8 rounded-lg bg-gray-200">
				<div className="flex items-center gap-2">
					<Image width={32} height={32} src={avatar} alt="avatar" className="rounded-full"/>
					<h3 className="font-bold text-gray-700">{name}</h3>
				</div>
				<div className="my-8">
					<p className="break-all">{title}</p>
				</div>

				<div className="flex items-center gap-4">
					<p className="text-sm font-bold text-gray-700">
						{comments?.length} Comments
					</p>
					<button onClick={(e) => setToggle(true)} className="text-sm font-bold text-red-500">Delete</button>
				</div>
			</div>
			{toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
		</>

	)
}

export default EditPost