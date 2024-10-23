import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

if (!dsn) {
  console.warn("Sentry DSN not found. Error tracking is disabled.");
}

Sentry.init({
  dsn,
  tracesSampleRate: 1,
  debug: false,
});
