"use client"; // ✅ This must be the first line

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Use `next/navigation` instead of `next/router`

export default function UserProfile() {
    const params = useParams();
    const { username } = params; // ✅ Extract username from params

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/user/${username}`);
                if (!res.ok) throw new Error("User not found");
                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        if (username) fetchData();
    }, [username]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {userData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold">{userData.name}'s Profile</h1>
                    <p>Username: {username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p className="text-gray-600">Loading...</p>
            )}
        </div>
    );
}
