import { NextRequest, NextResponse } from "next/server";
import { readRepoFile, verifyAdminPassword, writeRepoBinary } from "@/lib/github-admin";

export async function POST(request: NextRequest) {
  if (!verifyAdminPassword(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
    const path = `public/art/${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    let sha: string | undefined;
    try {
      const existing = await readRepoFile(path);
      sha = existing.sha;
    } catch {
      sha = undefined;
    }

    await writeRepoBinary(path, buffer, `Upload ${safeName} from admin`, sha);

    return NextResponse.json({ path: `/art/${safeName}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
