import firebaseApp from "@gaia/config/firebase";
import { getAuth } from "firebase/auth";
import { NextResponse, NextRequest } from "next/server";
import rateLimit from "express-rate-limit";

const auth = getAuth(firebaseApp);

export const dynamic = "force-dynamic";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

export async function POST(request: NextRequest) {
  try {
    await limiter(request);
    const data = await auth.signOut();
    return NextResponse.json(
      { success: true, data },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw new Error(error as string);
  }
}
