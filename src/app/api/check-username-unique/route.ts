 import dbConnect from "@/lib/dbConnect";
 import UserModel from "@/model/User";
 import { z} from 'zod';
 import { usernameValidation } from "@/schemas/signUpSchema";

 const UsernameQuerrySchema = z.object({
    username: usernameValidation
 })

 export async function GET (request: Request) {


    await dbConnect();

    try {
        const {searchParams} = new URL(request.url)
        const querryParam = {
            username: searchParams.get('username')
        }
        // Validate with Zod
       const result = UsernameQuerrySchema.safeParse(querryParam);

       console.log("Validation Result of check-username-unique > route.ts ",result) ; // ?? 

       if(!result.success){
        const usernameErrors = result.error.flatten().fieldErrors?.username || []
        return Response.json({
            success: false,
            message: usernameErrors?.length >0 ? usernameErrors.join(',') : 'Invalid query parameters',
        }, {status: 400})
       }

       const {username} = result.data

      const existingVerifiedUser = await UserModel.findOne({username, isVerified: true}) ; 

      if(existingVerifiedUser) {
        return Response.json({
            success: false,
            message: 'Username is already taken'
        }, {status: 400})
      }

      return Response.json({
        success: true,
        message: 'Username is avaliable..'
      }, {status: 200})

    } catch (error) {
        console.error("Error Checking UserName", error)
        return Response.json(
            {
                success: false,
                message: "Erro checkign username"
            },
            {status: 500}
        )
    }
 }