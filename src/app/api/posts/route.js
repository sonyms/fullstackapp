import { NextResponse } from "next/server"
import connect from '@/utilities/db'
import Post from "@/models/Post"

export const GET = async (request) => {

    const url = new URL(request.url);

    const name = url.searchParams.get("name");

    try {
        await connect()

        const posts = await Post.find(name && {name})
        
        return new NextResponse(JSON.stringify(posts),{status:200});

    } catch (error) {

        return new NextResponse("Database Error " +error,{status:500});
    }


}


export const POST = async (request) => {

    const body = await request.json();

    const newPost = new Post(body);

    try {
        await connect()

        await newPost.save();

        console.log(body)

        
        return new NextResponse("Post has been created.",{status:201});

    } catch (error) {

        return new NextResponse("Database Error " +error,{status:500});
    }


}