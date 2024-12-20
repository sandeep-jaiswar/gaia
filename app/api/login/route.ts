import firebaseApp from "@gaia/config/firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";
import { NextResponse, NextRequest } from "next/server";

const auth = getAuth(firebaseApp);

export const dynamic = "force-static";

interface SignInRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: SignInRequestBody = await request.json();

    const userCredential: UserCredential = await signInWithEmailAndPassword(
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
