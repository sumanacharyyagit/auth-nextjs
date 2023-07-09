import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptJs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //Check if user is exists
        const user = await User.findOne({ email }).select("password");
        if (!user) {
            return NextResponse.json(
                { error: "User doesn't exists" },
                { status: 400 }
            );
        }

        // Check if Password is correct
        const validPassword = await bcryptJs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Password is invalid" },
                { status: 400 }
            );
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Create token
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {
            expiresIn: process.env.JWT_EXPIRY!,
        });

        const response = NextResponse.json(
            { message: "Login successfull", success: true },
            { status: 200 }
        );

        response.cookies.set("token", token, { httpOnly: true });

        return response;

        // const newUser = new User({
        //     email,
        //     password: hashedPassword,
        // });

        // const savedUser = await newUser.save();
        // return NextResponse.json(
        //     {
        //         success: true,
        //         message: "User Created successfully",
        //         user: savedUser,
        //     },
        //     { status: 201 }
        // );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
