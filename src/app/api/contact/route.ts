import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSettings } from "@/lib/kv";

export const runtime = "nodejs";

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  // honeypot
  website?: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as ContactBody;
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  if (!body.name || !body.email || !body.subject || !body.message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured on the server yet." },
      { status: 500 },
    );
  }

  const settings = await getSettings();
  const to =
    process.env.CONTACT_TO_EMAIL || settings.contactEmail || "booking@octimesquartet.com";
  const from = process.env.CONTACT_FROM_EMAIL || "OC Times <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject: `[octimesquartet.com] ${body.subject}`,
      text: [
        `From: ${body.name} <${body.email}>`,
        ``,
        body.message,
      ].join("\n"),
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500 },
    );
  }
}
