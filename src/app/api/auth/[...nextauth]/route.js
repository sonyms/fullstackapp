import NextAuth from "next-auth"
import GoolgleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utilities/db"
import User from "@/models/User"
import bcrypt from "bcrypt"

const handler = NextAuth ({
  providers: [
    GoolgleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
        id:"credentials",
        name :"Credentials",
        async authorize(credentials){

            await connect()

            try{

                const user = await User.findOne({email:credentials.email})

                console.log(user);

                if(user){
                    
                    const isPassCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if(isPassCorrect){

                        return user
                    }
                    else{

                        throw new Error("Worng Credentials!!");
                    }

                }
                else{

                    throw new Error("User not found!")
                }
            }
            catch(err){
                throw new Error(err)
            }
        }
    })
  ],
  pages:{
    error:"/dashboard/login"
  }
})

export {handler as GET, handler as POST}