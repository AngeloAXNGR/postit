'use client'
import Image from 'next/image'
import Link from 'next/link'


import React from 'react'

const Post = ({avatar, name, postTitle, id, comments}: any) => {
	return (
		<div className='my-8 p-8 rounded-lg bg-gray-200'>
			<div className="flex items-center gap-2">
				<Image
					className="rounded-full"
					width={32}
					height={32}
					src={avatar}
					alt="avatar"
				/>
				<h3 className="font-bold text-gray-700 text-lg">{name}</h3>
			</div>
				<div className="my-8">
					<p className="break-all text-sm">{postTitle}</p>
				</div>
				<div className="flex gap-4 cursor-pointer items-center">
					{/* Comments */}
					<Link href={`/post/${id}`}>
						<p className="text-sm font-bold text-gray-700">{comments?.length} Comments</p>
					</Link>
				</div>

		</div>
	)
}

export default Post