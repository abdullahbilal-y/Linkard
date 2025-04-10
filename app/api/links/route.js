import { NextResponse } from "next/server";

export async function GET() {
    try {
      const res = await fetch("http://localhost:3001/api/links"); // Ensure port matches backend
      const data = await res.json();
  
      return NextResponse.json(data);
    } catch (error) {
      console.error("Error fetching links:", error);
      return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
    }
  }