import { NextRequest, NextResponse } from "next/server";
import siteData from "@/../content/site.json";
import { readRepoFile, verifyAdminPassword, writeRepoFile } from "@/lib/github-admin";

export async function GET(request: NextRequest) {
  if (!verifyAdminPassword(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await readRepoFile("content/site.json");
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json(siteData);
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminPassword(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { content: existing, sha } = await readRepoFile("content/site.json");
    void existing;

    const formatted = `${JSON.stringify(body, null, 2)}\n`;
    await writeRepoFile("content/site.json", formatted, "Update site content from admin", sha);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
