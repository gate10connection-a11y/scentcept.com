"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in → redirect
  if (session) {
    router.push("/account");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/account");
    }
    setLoading(false);
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {mode === "login" ? "Login" : "Create Account"}
        </span>
      </div>

      <div className="max-w-[400px] mx-auto px-6 py-16">
        {/* Toggle */}
        <div className="flex mb-10">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 h-[40px] text-[10px] tracking-[0.15em] uppercase transition-colors ab ${
              mode === "login" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 h-[40px] text-[10px] tracking-[0.15em] uppercase transition-colors ab ${
              mode === "signup" ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full h-12 ab flex items-center justify-center gap-3 text-[11px] tracking-[0.05em] hover:bg-gray-50 transition-colors mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-[10px] text-gray-400 tracking-[0.1em] uppercase">Or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-[12px] ab focus:outline-none focus:border-black transition-colors"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-[12px] ab focus:outline-none focus:border-black transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-[12px] ab focus:outline-none focus:border-black transition-colors"
            required
            minLength={6}
          />

          {error && (
            <p className="text-[11px] text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 ${
              loading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading
              ? "Processing..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
