import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";






export async function POST(request: Request){ // Request is the datatype of request
    await dbConnect()

    try {
       const {username, email, password} = await request.json()
     const existingUserVerifiedbyUsername = await UserModel.findOne({
        username,
        isVerified: true

       })
  // Check if username is taken
       if(existingUserVerifiedbyUsername){
        return Response.json({
            success: false,
            message: "Username is already taken"
        }, {status:400})
       }

// check if email is taken 
    const existingUserByEmail = await UserModel.findOne({email});

    // Generating Verify code
    const verifyCode = Math.floor(100000 + Math.random() *900000).toString()

    if(existingUserByEmail){
        //Todo: 
    }else{
       const hashedPassword = await bcrypt.hash(password,10)
       const expiryDate = new Date()
       expiryDate.setHours(expiryDate.getHours() + 1)

      const newUser = new UserModel({
          username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages: []
       })

       await newUser.save()
    }

    // Send Verification email
   const emailResponse = await sendVerificationEmail (
        email, 
        username,
        verifyCode
    )

    if(!emailResponse.success) {
        return Response.json({
            success: false,
            message: emailResponse.message
        }, {status:500}) 
    }

    return Response.json({
        success: true,
        message: "User Registered successfully. Please verify your email"
    }, {status:201})

    } catch (error) {
        console.error('Errro regestering user:', error)
        return Response.json(
        {
            success:false,
            message: "Error regesterign user"
        },
        {
            status: 500
        }
    )
    }
}