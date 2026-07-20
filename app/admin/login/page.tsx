"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { hydrateAuth, loginAdmin } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AdminLoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { accessToken, error, hydrated, loginStatus } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (hydrated && accessToken) {
      router.replace("/admin/dashboard");
    }
  }, [accessToken, hydrated, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await dispatch(loginAdmin({ email: email.trim(), password }));
    if (loginAdmin.fulfilled.match(result)) {
      router.replace("/admin/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbfaf8] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_18px_70px_rgba(15,23,42,0.10)] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden bg-transfer-dark p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Image
              src="/logoFotter.png"
              alt="Rubin Tours"
              width={58}
              height={75}
              className="h-24 w-auto object-contain"
              priority
            />
          </div>

          <div className="max-w-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-transfer-green">
              Admin Portal
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Manage the transfer website operations.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/70">
              Sign in to manage admins and account access for the dashboard.
            </p>
          </div>

        </section>

        <section className="p-6 md:p-10 lg:p-12">
          <div className="mb-10 lg:hidden">
            <Image
              src="/Logo.png"
              alt="Rubin Tours"
              width={38}
              height={49}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-transfer-green">
              Welcome Back
            </p>
            <h2 className="mt-3 text-3xl font-bold text-transfer-dark">Admin Login</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#667085]">
              Enter your admin credentials to open the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-transfer-dark">Email</span>
              <span className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#98a2b3]" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm font-medium text-transfer-dark outline-none transition-colors placeholder:text-[#98a2b3] focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
                />
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-transfer-dark">Password</span>
              <span className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#98a2b3]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-12 text-sm font-medium text-transfer-dark outline-none transition-colors placeholder:text-[#98a2b3] focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#667085] hover:bg-gray-100"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </span>
            </label>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loginStatus === "loading"}
              className="mt-2 flex h-12 items-center justify-center rounded-xl bg-transfer-green px-5 text-base font-bold text-white shadow-[0_8px_24px_rgba(196,135,70,0.22)] transition-colors hover:bg-[#ad743a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginStatus === "loading" ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
