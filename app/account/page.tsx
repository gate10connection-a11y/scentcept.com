"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div>
        <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Account</span>
        </div>
        <div className="text-center py-24">
          <p className="text-[12px] text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>My Account</span>
      </div>

      <div className="max-w-[600px] mx-auto px-6 py-16">
        {/* Profile */}
        <div className="flex items-center gap-5 mb-10 pb-10 ab-b">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={56}
              height={56}
              className="rounded-full"
            />
          ) : (
            <div className="w-14 h-14 bg-black text-white flex items-center justify-center text-[16px] font-medium rounded-full">
              {(session.user?.name || session.user?.email || "U")[0].toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-[14px] font-medium">{session.user?.name || "User"}</p>
            <p className="text-[12px] text-gray-400 mt-1">{session.user?.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-0">
          {[
            { label: "Orders", desc: "View your order history", href: "/order-confirmation?demo=true" },
            { label: "Addresses", desc: "Manage delivery addresses", href: "#" },
            { label: "Wishlist", desc: "Your saved items", href: "/collections" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between py-5 ab-b hover:bg-gray-50 transition-colors px-4 -mx-4"
            >
              <div>
                <p className="text-[12px]">{item.label}</p>
                <p className="text-[11px] text-gray-400 mt-1">{item.desc}</p>
              </div>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Sign Out */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full h-12 mt-10 text-[10px] tracking-[0.2em] uppercase ab hover:bg-black hover:text-white transition-all duration-200"
        >
          Sign Out
        </button>

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
