"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Login here
            </button>
            <Link href={"/signup"}>Visit Signup</Link>
        </div>
    );
}
