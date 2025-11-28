import mongoose, {Schema, Document} from "mongoose";

// export interface Message extends Document {
//     content: string;
//     createdAt: Date
// }

// ** MESSAGE SCHEMA **

// Modern Syntax
export interface Message {
    content: string;
    createdAt: Date;
}

  const MessageSchema = new Schema<Message> ({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    }
        
  })

  // ** USER SCHEMA ** 


  export interface User {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
  }

  const UserSchema = new Schema<User> ({
    username: {
        type: String ,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , "please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'VerifyCode expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;