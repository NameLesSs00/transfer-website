import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_MAX_AGE_SECONDS } from "@/lib/authTokens";

const API_BASE_URL = process.env.NEXT_PUBLIC_TRANSFER_API_URL ?? "https://transfer.tryasp.net/api";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token available" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/Auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        ...(request.headers.get("Authorization")
          ? { Authorization: request.headers.get("Authorization") as string }
          : {}),
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      const nextResponse = NextResponse.json(
        { success: false, message: data.message || "Failed to refresh token" },
        { status: 401 }
      );
      nextResponse.cookies.delete(REFRESH_TOKEN_COOKIE);
      return nextResponse;
    }

    const newAccessToken = data.data.accessToken;
    const newRefreshToken = data.data.refreshToken ?? refreshToken;

    const nextResponse = NextResponse.json({
      success: true,
      message: "Success",
      data: {
        accessToken: newAccessToken,
        email: data.data.email,
        fullName: data.data.fullName,
      },
    });

    nextResponse.cookies.set(REFRESH_TOKEN_COOKIE, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
    });

    return nextResponse;
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
