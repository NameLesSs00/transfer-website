import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REFRESH_TOKEN_COOKIE } from "@/lib/authTokens";

const API_BASE_URL = process.env.NEXT_PUBLIC_TRANSFER_API_URL ?? "https://transfer.tryasp.net/api";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
    
    // Attempt to parse the request body to get the token (optional, for the Authorization header)
    let body = null;
    try {
      body = await request.json();
    } catch {
      // Ignore
    }

    if (refreshToken) {
      // Try to log out from the backend
      try {
        await fetch(`${API_BASE_URL}/Auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            ...(body?.token ? { Authorization: `Bearer ${body.token}` } : {}),
          },
          body: JSON.stringify(refreshToken),
        });
      } catch (err) {
        // We still want to clear local cookies even if the backend call fails
        console.error("Backend logout failed", err);
      }
    }

    const nextResponse = NextResponse.json({ success: true, message: "Logged out" });
    nextResponse.cookies.delete(REFRESH_TOKEN_COOKIE);

    return nextResponse;
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
