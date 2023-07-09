import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptJs from "bcryptjs";

dbConnect();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        //Check if user is already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash Password
        const salt = await bcryptJs.genSalt(10);
        const hashedPassword = await bcryptJs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        return NextResponse.json(
            {
                success: true,
                message: "User Created successfully",
                user: savedUser,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
