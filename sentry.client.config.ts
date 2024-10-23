import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

if (!dsn) {
  console.warn("Sentry DSN not found. Error tracking is disabled.");
}

Sentry.init({
  dsn,
  enabled: process.env.NODE_ENV === "production",
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: process.env.NODE_ENV !== "production",
});
