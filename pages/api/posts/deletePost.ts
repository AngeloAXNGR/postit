import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../auth/[...nextauth]';
import prisma from '../../../prisma/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
){
	if(req.method === "DELETE"){
		// Check if a user is logged in before creating a post
		const session = await getServerSession(req, res, authOptions)
		if(!session) return res.status(401).json({message: 'Please Sign in'})

		const title: string = req.body.title

		// Delete a Post
		try{
			const postId = req.body
			const result = await prisma.post.delete({
				where: {
					id:postId
				}
			})
			res.status(200).json(result)
		}catch(err){
			res.status(403).json({err: 'Error Deleting Post'})
		}
	}
}