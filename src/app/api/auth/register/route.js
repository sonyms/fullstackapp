import User from "@/models/User";
import connect from "@/utilities/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export const POST = async (request) =>{

    const {name,email,password} = await request.json();

    await connect();

    const hashPassword = await bcrypt.hash(password,5);

    console.log(hashPassword)

    const newUser = new User({
        name,
        email,
        password:hashPassword
    })

    try{

        await newUser.save();

        return new NextResponse("User has been created",{

            status:201
        })
    }
    catch(err){

        console.log(err)
        return new NextResponse(err,{
            status:500
        })
    }
}