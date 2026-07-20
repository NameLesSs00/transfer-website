import { NextResponse } from "next/server";
import { REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_MAX_AGE_SECONDS } from "@/lib/authTokens";

const API_BASE_URL = process.env.NEXT_PUBLIC_TRANSFER_API_URL ?? "https://transfer.tryasp.net/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, message: data.message || "Login failed" },
        { status: response.status || 400 }
      );
    }

    const { accessToken, refreshToken, email, fullName } = data.data;

    const nextResponse = NextResponse.json({
      success: true,
      message: "Success",
      data: {
        accessToken,
        email,
        fullName,
      },
    });

    nextResponse.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
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
