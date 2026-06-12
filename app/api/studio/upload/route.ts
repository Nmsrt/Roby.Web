import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

/**
 * Saves an uploaded image as public/profile.jpg (the hero avatar).
 * Same write policy as the content API: development or STUDIO_WRITE=true.
 */
const WRITES_ENABLED =
  process.env.NODE_ENV === "development" ||
  process.env.STUDIO_WRITE === "true";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(req: Request) {
  if (!WRITES_ENABLED) {
    return NextResponse.json(
      {
        error:
          "File writes are disabled on this deployment. Save your photo manually as public/profile.jpg, commit and redeploy.",
      },
      { status: 403 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected multipart form data" },
      { status: 400 }
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Use a JPEG, PNG or WebP image" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image too large (max 8MB)" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(
    path.join(process.cwd(), "public", "profile.jpg"),
    buffer
  );

  return NextResponse.json({ ok: true });
}
