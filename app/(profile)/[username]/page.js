"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const UserProfile = () => {
    const params = useParams(); // Fix: params is now a Promise in Next.js 15+
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userLinks, setUserLinks] = useState([]);

    // Unwrap params (Fix for Next.js 15+)
    useEffect(() => {
        async function fetchParams() {
            const unwrappedParams = await params; // Wait for params to resolve
            setUsername(unwrappedParams.username);
        }
        fetchParams();
    }, [params]);

    // Fetch User Data
    useEffect(() => {
        if (!username) return; // Ensure username is available

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/user/${username}`);
                if (!res.ok) throw new Error("User not found");
                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [username]);

    // Fetch User Links
    useEffect(() => {
        if (!userData) return; // Ensure user data is loaded first

        const fetchLinks = async () => {
            try {
                const res = await fetch(`/api/user/links/${userData._id}`);
                if (!res.ok) throw new Error("No links found");
                const links = await res.json();
                setUserLinks(links);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLinks();
    }, [userData]);

    return (
        <div>
            {userData ? (
                <>
                    <h1>{userData.name}</h1>
                    <img src={userData.profilePicture} alt="Profile" />
                    <p>{userData.bio}</p>

                    <ul>
                        {userLinks.map((link) => (
                            <li key={link._id}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default UserProfile;
