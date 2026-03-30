import type { NextRequest } from "next/server";
import { Resend } from "resend";

type Lang = "de" | "en";

function messages(lang: Lang) {
  return {
    invalid: lang === "en" ? "Invalid input." : "Ungültige Eingabe.",
    noResend:
      lang === "en"
        ? "Email delivery is not configured. Please set RESEND_API_KEY."
        : "E-Mail-Versand nicht konfiguriert. Bitte RESEND_API_KEY setzen.",
    sendFailed: lang === "en" ? "Failed to send the message." : "Nachricht konnte nicht gesendet werden.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; email?: string; message?: string; lang?: string };
    const lang: Lang = body.lang === "en" ? "en" : "de";
    const m = messages(lang);
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: m.invalid, errorCode: "INVALID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY ist nicht gesetzt.");
      return new Response(JSON.stringify({ success: false, error: m.noResend, errorCode: "NO_MAIL_CONFIG" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(apiKey);

    const from =
      process.env.RESEND_FROM?.trim() ||
      "Plesnicar Solutions Kontaktformular <onboarding@resend.dev>";
    const to = process.env.CONTACT_INBOX?.trim() || "plesnicaroffice@gmail.com";

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff1900; border-bottom: 2px solid #ff1900; padding-bottom: 10px;">
            Neue Kontaktanfrage
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${String(name)}</p>
            <p style="margin: 10px 0;"><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Nachricht:</h3>
            <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-left: 4px solid #ff1900; border-radius: 4px;">
              ${String(message).replace(/\n/g, "<br>")}
            </p>
          </div>
        </div>
      `,
      text: `Neue Kontaktanfrage\n\nName: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    if (error) {
      console.error("Resend Fehler:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: `${m.sendFailed} ${error.message || ""}`.trim(),
          errorCode: "SEND_FAILED",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("E-Mail erfolgreich versendet:", data?.id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    const errorMessage = error instanceof Error ? error.message : "unknown";
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        errorCode: "SEND_FAILED",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
