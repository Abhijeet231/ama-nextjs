 import {email, z} from "zod";

 export const usernameValidation = z
   .string()
   .min(2,"Username must be atleast 2 characters")
   .max(20, "Username should not exceed 20 Characters")
   .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")


   export const signUpSchema  = z.object({
     username: usernameValidation,
     email: z.email({message:"Invalid email address"}),
     password: z.string().min(6,{message:"password mus be atleast 6 characters"})
   })