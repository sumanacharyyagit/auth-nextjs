"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("api/users/logout");
            toast.success("User logged out");
            router.push("/login");
        } catch (error: any) {
            console.log("Error:", error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const resp = await axios.get("api/users/me");

        console.log(resp);
        setUserData(resp.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="m-4">Profile Page</p>
            <h2>
                {!userData ? (
                    ""
                ) : (
                    <Link
                        href={`/profile/${userData}`}
                        className="bg-teal-500 mt-4 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Profile for: {userData}
                    </Link>
                )}
            </h2>
            <hr />
            <button
                className="bg-indigo-300 mt-4 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >
                Get User Details
            </button>

            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >
                Logout
            </button>

            <hr />
            <h2>
                <Link
                    href={`/forgotpassword`}
                    className="bg-teal-500 mt-4 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Forgot Password
                </Link>
            </h2>
        </div>
    );
}
