import firebase_app from "@gaia/app/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";
import { NextResponse, NextRequest } from "next/server";

const auth = getAuth(firebase_app);

export const dynamic = "force-static";

interface SignInRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: SignInRequestBody = await request.json();

    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return NextResponse.json({ user: userCredential.user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
      }
      throw new Error(error as string);
  }
}
