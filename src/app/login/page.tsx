"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    const onLogin = async () => {
        try {
            setIsLoading(true);
            const resp = await axios.post("/api/users/login", { ...user });
            toast.success("Login successful...!");
            console.log("Login successful", resp.data);
            router.push("/profile");
        } catch (error: any) {
            console.log("Error", error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else setButtonDisabled(true);
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!isLoading ? "Login" : "Processing..."}</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
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
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                placeholder="password"
                value={user.password}
                onChange={(e) =>
                    setUser((state) => ({ ...state, password: e.target.value }))
                }
            />
            <button
                onClick={onLogin}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
                    buttonDisabled
                        ? "cursor-not-allowed disabled:opacity-75"
                        : ""
                }`}
                disabled={buttonDisabled}
            >
                Login
            </button>
            <Link href={"/signup"}>Visit Signup</Link>
        </div>
    );
}
