import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

if (!dsn) {
  console.warn("Sentry DSN not found. Error tracking is disabled.");
}

Sentry.init({
  dsn,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  debug: process.env.NODE_ENV === "development",
  beforeSend(event) {
    if (event.user) {
      delete event.user.email;
    }
    return event;
  },
});
