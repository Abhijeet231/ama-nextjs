import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?:string
    }

    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?:string 
        } & DefaultSession['user']  // ???
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
         isVerified?: boolean;
         isAcceptingMessages?: boolean;
         username?:string 
    }
}



// This is called Module augmentaion in Typescript 
// Here it's extending NextAuth's - User and Session type - so that TypeScript knows about _id , isVerified and all.. 

// Without this Ts only knows =
//  session.user = { name?: string, email?: string, image?: string }
