import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();

    if (!isValidEmail(trimmed)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const subscribers: { email: string; subscribedAt: string }[] = JSON.parse(raw);

    if (subscribers.some((s) => s.email === trimmed)) {
      return NextResponse.json({ error: "This email is already subscribed." }, { status: 409 });
    }

    subscribers.push({ email: trimmed, subscribedAt: new Date().toISOString() });
    fs.writeFileSync(DATA_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "An error occurred. Please try again." }, { status: 500 });
  }
}
