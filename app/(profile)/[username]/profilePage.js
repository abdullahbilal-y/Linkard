"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const UserProfile = () => {
    const { username } = useParams(); // ✅ Fix: No need to use await
    const [userData, setUserData] = useState(null);
    const [userLinks, setUserLinks] = useState([]);

    console.log("🔍 Username from URL:", username); // Debugging

    // Fetch User Data
    useEffect(() => {
        if (!username) return; // Ensure username exists

        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/user/${username}`);
                if (!res.ok) throw new Error("User not found");
                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error("❌ Fetch error:", error);
            }
        };

        fetchData();
    }, [username]);

    return (
        <div>
            {userData ? (
                <>
                    <h1>{userData.name}</h1>
                    <img src={userData.profilePicture} alt="Profile" />
                    <p>{userData.bio}</p>
                </>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default UserProfile;
