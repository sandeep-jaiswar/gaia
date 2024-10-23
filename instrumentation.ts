import * as Sentry from "@sentry/nextjs";

export async function register() {
  const runtime = process.env.NEXT_RUNTIME;
  if (!runtime) {
    console.warn("NEXT_RUNTIME environment variable is not set");
    return;
  }
  try {
    if (runtime === "nodejs") {
      await import("./sentry.server.config");
    }

    if (runtime === "edge") {
      await import("./sentry.edge.config");
    }
  } catch (error) {
    console.error("Failed to initialize Sentry:", error);
  }
}

export const onRequestError = Sentry.captureRequestError;
