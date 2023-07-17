"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    const [passwordData, setPasswordData] = useState({
        oldPass: "",
        newPass: "",
        newConfPass: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
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

    const resetHandler = async () => {
        // const resp = await axios.get("api/users/me");

        console.log(passwordData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{"Reset Password"}</h1>
            <hr />
            <label htmlFor="username">Old Password</label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password"
                id="oldPass"
                placeholder="Old Password"
                value={passwordData.oldPass}
                onChange={(e) =>
                    setPasswordData((state) => ({
                        ...state,
                        oldPass: e.target.value,
                    }))
                }
            />
            <label htmlFor="email">New Password</label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password"
                id="newPass"
                placeholder="New Password"
                value={passwordData.newPass}
                onChange={(e) =>
                    setPasswordData((state) => ({
                        ...state,
                        newPass: e.target.value,
                    }))
                }
            />
            <label htmlFor="password">Confirm New Password</label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password"
                id="newConfPass"
                placeholder="New Confirm Password"
                value={passwordData.newConfPass}
                onChange={(e) =>
                    setPasswordData((state) => ({
                        ...state,
                        newConfPass: e.target.value,
                    }))
                }
            />
            <button
                onClick={resetHandler}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
                    buttonDisabled
                        ? "cursor-not-allowed disabled:opacity-75"
                        : ""
                }`}
                disabled={buttonDisabled}
            >
                Signup
            </button>
            <Link href={"/login"}>Visit Login</Link>
        </div>
    );
}
