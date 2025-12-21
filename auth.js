import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectDB from "./config/connectDB";
import User from "./models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params:{
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
            }
        }
    })
  ],
  callbacks: {
    //invoked after successful sign in
    async signIn({user, account, profile, email, credentials}) {
        try {
            console.log("User signed in:", user);
            //connect to database
            await connectDB();
            //check if user exists
            const userExists = await User.findOne({email: profile.email});
            //if not, create new user
            if(!userExists) {
                const username = profile.name.slice(0,20);
                await User.create({
                    email: profile.email,
                    username: username,
                    image: profile.picture
                });
            }
            //return true to allow sign in
            return true
        } catch (error) {
            console.log("Error in signIn callback:", error)
            return false
        }
        
    },
    async session({session, token, user}) {
        try {
            //get user from database
            const user = await User.findOne({email: session.user.email});
            //assign user id fromm the session
             session.user.id = user._id.toString();
            return session;
        } catch (error) {
            console.log("Error in session callback:", error)
        }
        return session
    }
  }
}

export default NextAuth(authOptions)