"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage(props: any) {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            axios.post("api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log("Error: ", error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl">Verify email</h1>
                <h2 className="p-2 bg-orange-500 text-black">
                    {token ? `${token}` : "No Token"}
                </h2>
                {verified && (
                    <div>
                        <h1 className="text-2xl">
                            Email verified successfully!
                        </h1>
                        <Link href={"/login"} className="text-blue-600">
                            Go to Login
                        </Link>
                    </div>
                )}
                {error && (
                    <div>
                        <h1 className="text-2xl bg-red-500 text-white">
                            Email verified failed!
                        </h1>
                    </div>
                )}
            </div>
        </>
    );
}
