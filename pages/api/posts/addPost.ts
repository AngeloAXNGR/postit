import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../auth/[...nextauth]';
import prisma from '../../../prisma/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
){
	if(req.method === "POST"){
		// Check if a user is logged in before creating a post
		const session = await getServerSession(req, res, authOptions)
		if(!session) return res.status(401).json({message: 'Please Sign in to make a post.'})

		const title: string = req.body.title

		// Get User that is logged in
		const prismaUser = await prisma.user.findUnique({
			where: {email: session?.user?.email},
		})

		//Check title
		if(title.length > 300) return res.status(403).json({message: 'Please a shorter post.'})

		if(!title.length) return res.status(403).json({message:'Input should not be empty'})

		// Create Post
		try{
			const result = await prisma.post.create({
				data: {
					title,
					userId: prismaUser!.id, // associate post to the logged in user
				}
			})
			res.status(200).json(result)
		}catch(err){
			res.status(403).json({err: 'Error has occured whilst making a post'})
		}
	}
}