import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
){
	if(req.method === "GET"){
		// Fetch all Posts
		try{
			const data = await prisma.post.findMany({
				//include property establishes relationships among tables (user and comments in this case)
				include:{
					user:true,
					comments:true,
				},
				orderBy:{
					createdAt:"desc",
				}
			})
			res.status(200).json(data)
		}catch(err){
			res.status(403).json({err: 'Error fetching posts'})
		}
	}
}