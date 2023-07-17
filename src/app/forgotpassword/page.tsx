"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    const forgetPassEmailHandler = async () => {
        const resp = await axios.get("api/users/me");

        console.log(resp);
        setUserData(resp.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-6">
            <h1>Forget PAssword</h1>
            <hr />
            <p className="m-4">Send E-Mail</p>

            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={forgetPassEmailHandler}
            >
                Send Email
            </button>
            <hr />
            <h2>
                <Link
                    href={`/profile`}
                    className="bg-teal-500 mt-4 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back to Profile
                </Link>
            </h2>
        </div>
    );
}
