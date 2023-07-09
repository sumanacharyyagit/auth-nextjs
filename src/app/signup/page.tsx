"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    const onSignup = async () => {
        try {
            setIsLoading(true);
            const resp = await axios.post("/api/users/signup", { ...user });
            toast.success("Signup successful...!");
            console.log("Signup success: ", resp.data);
            router.push("/login");
        } catch (error: any) {
            console.log("error", error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else setButtonDisabled(true);
    }, [user]);

    console.log(buttonDisabled);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!isLoading ? "Signup" : "Processing..."}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="username"
                placeholder="username"
                value={user.username}
                onChange={(e) =>
                    setUser((state) => ({ ...state, username: e.target.value }))
                }
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="email"
                placeholder="email"
                value={user.email}
                onChange={(e) =>
                    setUser((state) => ({ ...state, email: e.target.value }))
                }
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password"
                id="password"
                placeholder="password"
                value={user.password}
                onChange={(e) =>
                    setUser((state) => ({ ...state, password: e.target.value }))
                }
            />
            <button
                onClick={onSignup}
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
