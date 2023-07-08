"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignupPage() {
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const onSignup = async () => {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Signup here
            </button>
            <Link href={"/login"}>Visit Login</Link>
        </div>
    );
}
