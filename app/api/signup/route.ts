import firebaseApp from "@gaia/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";
import { NextResponse, NextRequest } from "next/server";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInRequestBody = z.infer<typeof SignInSchema>;

const auth = getAuth(firebaseApp);

export const dynamic = "force-dynamic";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

export async function POST(request: NextRequest) {
  try {
    await limiter(request);
    const body = await request.json();
    const { email, password }: SignInRequestBody = SignInSchema.parse(body);
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return NextResponse.json(
      { success: true, user: userCredential.user },
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
